import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ee_agend} from '../../shared/models';

/**
 * Generated class for the ScheduleDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule-details',
  templateUrl: 'schedule-details.html',
})
export class ScheduleDetailsPage {
   session:ee_agend;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.session=  this.navParams.get('agend');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailsPage');
  }

}
