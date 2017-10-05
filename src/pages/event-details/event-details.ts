import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import {PonentesPage} from '../ponentes/ponentes';
import {eerevet,sponsors} from '../../shared/models';
import {SchedulePage} from '../schedule/schedule';
import {ChatPage} from '../chat/chat';
import {AskPage} from '../ask/ask';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {ImagePipe} from '../../pipes/image/image';
import {LocationPage} from '../location/location';
import {SponsorsPage} from '../sponsors/sponsors';
import {SevenProvider} from '../../providers/seven/seven';
import {SponsorDetaillPage} from '../sponsor-detaill/sponsor-detaill';
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
  sponsors:sponsors[];
  username:string;
  loggued:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private userdata:UserDataProvider,
  private loading :LoadingController,private seven:SevenProvider,private toast:ToastController) {
    this.thisEvent = this.navParams.get("event");
  }
  ionViewDidLoad() {
    this.userdata.hasLoggedIn().then(login=>{
      this.loggued=login;
      this.getSponsors();
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
  goSponsors(){
      this.navCtrl.push(SponsorsPage,{'event':this.thisEvent});
  }
  getSponsors(){
    let load = this.loading.create({
      content:'Cargando...'
    });
   load.present();
    this.seven.getPatre(this.thisEvent.rev_cont).then(resp=>{
   if (resp==undefined){
    load.dismiss();
    this.showMessage("No hay patrocinadores para este evento.")
return;
  }
  console.log(resp);
     this.sponsors= resp;
     load.dismiss();
   }).catch(err=>{
     load.dismiss();
       this.showMessage(err);
   })

  }
  showMessage(msg:string){
    const toast = this.toast.create({
     message: msg,
     duration: 3000
   }).present();
  }
  goSponsor(sponsor:sponsors){
    this.navCtrl.push(SponsorDetaillPage, {'sponsor':sponsor})
  }
}
