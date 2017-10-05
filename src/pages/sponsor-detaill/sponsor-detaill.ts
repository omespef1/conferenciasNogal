import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {sponsors,eelinke} from '../../shared/models';
import {SocialPipe} from '../../pipes/social/social';
import {ColorsPipe} from '../../pipes/colors/colors';
import { BrowserTab } from '@ionic-native/browser-tab';



/**
 * Generated class for the SponsorDetaillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sponsor-detaill',
  templateUrl: 'sponsor-detaill.html',
})
export class SponsorDetaillPage {
 public sponsor:sponsors;
  constructor(public navParams: NavParams,private browserTab: BrowserTab) {
  this.sponsor=  navParams.get("sponsor");
  console.log(this.sponsor.lin_link)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SponsorDetaillPage');
  }
 openUrl(url:string){

   this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } else {
      console.log("browser no disponible")
      }

 })

 }
 }
