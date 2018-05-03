import { Component } from '@angular/core';
import { IonicPage, ViewController,NavController,NavParams} from 'ionic-angular';
import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';

/**
 * Generated class for the ContactProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-contact-profile',
  templateUrl: 'contact-profile.html',
})
export class ContactProfilePage {
infoUser:any;
   customColors : any={};
  constructor(private viewCtrl:ViewController, private nav:NavController,
  private navParam:NavParams,private _config:EventConfigurationProvider) {
  this.infoUser= navParam.get('msg');
     this.customColors = _config.GetCustomColors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactProfilePage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

}
