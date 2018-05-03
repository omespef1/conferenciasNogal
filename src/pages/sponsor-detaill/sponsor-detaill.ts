import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {sponsors,eelinke} from '../../shared/models';
import {SocialPipe} from '../../pipes/social/social';
import {ColorsPipe} from '../../pipes/colors/colors';
import { BrowserTab } from '@ionic-native/browser-tab';
 import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';



/**
 * Generated class for the SponsorDetaillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sponsor-detaill',
  templateUrl: 'sponsor-detaill.html',
})
export class SponsorDetaillPage {
 public sponsor:sponsors;
  customColors : any={};
  constructor(public navParams: NavParams,private browserTab: BrowserTab, private _config:EventConfigurationProvider) {
  this.sponsor=  navParams.get("sponsor");
  this.customColors = _config.GetCustomColors();
  }

  ionViewDidLoad() {
  }
 openUrl(url:string){
 console.log(url);
   this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } else {

      }

 })

 }
 }
