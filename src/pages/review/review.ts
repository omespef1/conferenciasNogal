import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pipes
import {ImagePipe} from '../../pipes/image/image';
//models
import {eerevet} from '../../shared/models';
import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';
/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
 event:eerevet;
 public customColors :any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private _config:EventConfigurationProvider) {
    this.event = navParams.get('event');
    this.customColors = _config.GetCustomColors();
  }

  ionViewDidLoad() {

  }

}
