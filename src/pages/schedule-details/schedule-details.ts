import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ee_agend} from '../../shared/models';
import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';

/**
 * Generated class for the ScheduleDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-schedule-details',
  templateUrl: 'schedule-details.html',
})
export class ScheduleDetailsPage {
   customColors : any={};
   session:ee_agend;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _config:EventConfigurationProvider) {
  this.session=  this.navParams.get('agend');
  console.log(this.session);
   this.customColors = _config.GetCustomColors();
  }

  ionViewDidLoad() {
  }

}
