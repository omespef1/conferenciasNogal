import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PonentesPage} from '../ponentes/ponentes';
import {eerevet} from '../../shared/models';
import {SchedulePage} from '../schedule/schedule';
import {ChatPage} from '../chat/chat';
import {AskPage} from '../ask/ask';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {ImagePipe} from '../../pipes/image/image';
import {LocationPage} from '../location/location';
/**
 * Generated class for the EventDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  thisEvent:eerevet;
  username:string;
  loggued:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private userdata:UserDataProvider) {
    this.thisEvent = this.navParams.get("event");
  }
  ionViewDidLoad() {
    this.userdata.hasLoggedIn().then(login=>{
      this.loggued=login;
    })
    console.log('ionViewDidLoad EventDetailsPage');
  }
  goPonents(){
    console.log("enviando..." + this.thisEvent)
    this.navCtrl.push(PonentesPage,{'event':this.thisEvent});
  }
  goAgenda(){
    this.navCtrl.push(SchedulePage,{'event':this.thisEvent});
  }
  goChat(){
    console.log(this.thisEvent)
      this.navCtrl.push(ChatPage,{'event':this.thisEvent});
  }
  goEncuesta(){
    console.log(this.thisEvent)
      this.navCtrl.push(AskPage,{'event':this.thisEvent});
  }
  goLocation(){
      this.navCtrl.push(LocationPage);
  }

}
