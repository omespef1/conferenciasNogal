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
import {RegisterPage} from '../register/register';
import {LoginPage} from '../login/login';
import {SevenProvider} from '../../providers/seven/seven';
import {SponsorDetaillPage} from '../sponsor-detaill/sponsor-detaill';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ApiProvider} from '../../providers/api/api';
import { FileOpener } from '@ionic-native/file-opener';
/**
 * Generated class for the EventDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
  private loading :LoadingController,private seven:SevenProvider,private toast:ToastController,
  private transfer: FileTransfer, private file: File,private fileOpener: FileOpener,
private api:ApiProvider) {
    this.thisEvent = this.navParams.get("event");
    this.userdata.hasLoggedIn().then(login=>{
      this.loggued=login;
      console.log(login);
    })
    this.userdata.setDataAgend(this.thisEvent.agend);
    console.log(this.thisEvent.agend);
    this.userdata.setDataSpekaers(this.thisEvent.speakers);
    this.userdata.setDataSponsors(this.thisEvent.sponsors);
    this.userdata.setDataAsk(this.thisEvent.ask);
    this.api.chargue();
  }
  ionViewDidLoad() {
    this.load();
  }
  load(){
    let load = this.loading.create({
      content:'Cargando...'
    });
   load.present();
    this.getSponsors();
    load.dismiss();
  }
  goPonents(){
    this.navCtrl.push(PonentesPage,{'event':this.thisEvent});
  }
  goAgenda(){
    this.navCtrl.push(SchedulePage,{'event':this.thisEvent});
  }
  goChat(){
      this.navCtrl.push(ChatPage,{'event':this.thisEvent});
  }
  goEncuesta(){
      this.navCtrl.push(AskPage,{'event':this.thisEvent});
  }
  goLocation(){
      this.navCtrl.push(LocationPage);
  }
  goSponsors(){
      this.navCtrl.push(SponsorsPage,{'event':this.thisEvent});
  }
  getSponsors(){
    this.userdata.getDataSponsors(this.thisEvent.rev_cont).then(data=>{
      this.sponsors= data;
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
  goSign(){
    this.navCtrl.push(RegisterPage)
  }
  goLogin(){
    this.navCtrl.push(LoginPage)
  }
  goOut(){
    this.userdata.logout();
    this.showMessage('Su sesión se ha cerrado!');
    this.navCtrl.setRoot(LoginPage);
  }
  noAvailable(){
    this.showMessage('Esta opción aún no se encuentra disponible.');
  }

  downloadMap(){
    this.downloadFile(this.api.data.mapa,'mapa.pdf');
  }
  downloadBrochure(){
      this.downloadFile(this.api.data.brochure,'brochure.pdf');
  }
  downloadFile(url:string,fileName:string){
    let load = this.loading.create({
      content:'Cargando...'
    });
   load.present();
    console.log(url);
  const fileTransfer: FileTransferObject = this.transfer.create();
   fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
       console.log('download complete: ' + entry.toURL());
         this.openFile(this.file.dataDirectory + fileName);
        load.dismiss();
     }, (error) => {
         this.showMessage('Error descargando archivo pdf' + error);
           load.dismiss();
     }).catch(err=>{
         load.dismiss();
     })
  }
  openFile(url:string){
    console.log("abriendo " + url);
    this.fileOpener.open(url, 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error openening file', e));
  }
}
