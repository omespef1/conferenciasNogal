import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController,Platform} from 'ionic-angular';
import {PonentesPage} from '../ponentes/ponentes';
import {eerevet,sponsors,ee_perso} from '../../shared/models';
import {SchedulePage} from '../schedule/schedule';
import {ChatPage} from '../chat/chat';
import {AskPage} from '../ask/ask';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {ImagePipe} from '../../pipes/image/image';
import {LocationPage} from '../location/location';
import {SponsorsPage} from '../sponsors/sponsors';
import {RegisterPage} from '../register/register';
import {ReviewPage} from '../review/review';
import {CalendarioPage} from '../calendario/calendario';
import {LoginPage} from '../login/login';
import {SevenProvider} from '../../providers/seven/seven';
import {SponsorDetaillPage} from '../sponsor-detaill/sponsor-detaill';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ApiProvider} from '../../providers/api/api';
import { FileOpener } from '@ionic-native/file-opener';
//providers
import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';
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
  customColors : any;
  agendMain:ee_perso=new ee_perso('','S','','');
  askMain:ee_perso=new ee_perso('','S','','');
  chatMain:ee_perso=new ee_perso('','S','','');
  sponsorsMain:ee_perso=new ee_perso('','S','','');
  brochureMain:ee_perso=new ee_perso('','S','','');
  speakersMain:ee_perso=new ee_perso('','S','','');
  mapMain : ee_perso=new ee_perso('','S','','');
  constructor(public navCtrl: NavController, public navParams: NavParams,private userdata:UserDataProvider,
  private loading :LoadingController,private seven:SevenProvider,private toast:ToastController,
  private transfer: FileTransfer, private file: File,private fileOpener: FileOpener,
private api:ApiProvider,private _config:EventConfigurationProvider,private platform:Platform) {

    this.thisEvent = this.navParams.get("event");
    console.log(this.thisEvent);
    _config.setCustomColors(this.thisEvent)
   this.customColors = _config.GetCustomColors();
    this.userdata.hasLoggedIn().then(login=>{
      this.loggued=login;
    })
    this.userdata.setDataAgend(this.thisEvent.agend);
    this.userdata.setDataSpekaers(this.thisEvent.speakers);
    this.userdata.setDataSponsors(this.thisEvent.sponsors);
    this.userdata.setDataAsk(this.thisEvent.ask);
    this.api.chargue();
  }
  ionViewDidLoad() {
    this.load();
    this.loadCustomMain();
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
  goReview(){
      this.navCtrl.push(ReviewPage,{'event':this.thisEvent});
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
loadCustomMain(){
  try{    
    if( this.thisEvent.perso==null ||this.thisEvent.perso.length<7)
    throw new Error('Menú no parametrizado completamente. Por favor , realice la parametrización  en el programa SEEREVET ')
    console.log('valida');
    this.agendMain = this.thisEvent.perso.filter((v) => v.per_nico=='Agenda')[0];
    this.askMain = this.thisEvent.perso.filter((v) => v.per_nico=='Encuesta')[0];
    this.chatMain = this.thisEvent.perso.filter((v) => v.per_nico=='Chat')[0];
    this.sponsorsMain = this.thisEvent.perso.filter((v) => v.per_nico=='Patrocinadores')[0];
    this.brochureMain = this.thisEvent.perso.filter((v) => v.per_nico=='Brochure')[0];
    this.speakersMain = this.thisEvent.perso.filter((v) => v.per_nico=='Conferencistas')[0];
    console.log(this.speakersMain);
    this.mapMain = this.thisEvent.perso.filter((v) => v.per_nico=='Mapa')[0];
  }
catch(err){
    this.showMessage(err);
    this.navCtrl.push(CalendarioPage)
}
}

  // downloadMap(){
  //   this.downloadFile(this.api.data.mapa,'mapa.pdf');
  // }
  downloadBrochure(){
    this.saveAndOpenPdf(this.thisEvent.rev_brch,'brochure')
      // this.downloadFile(this.api.data.brochure,'brochure.pdf');
  }
  // downloadFile(url:string,fileName:string){
  //   let load = this.loading.create({
  //     content:'Cargando...'
  //   });
  //  load.present();
  //   console.log(url);
  // const fileTransfer: FileTransferObject = this.transfer.create();
  //  fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
  //      console.log('download complete: ' + entry.toURL());
  //        this.openFile(this.file.dataDirectory + fileName);
  //       load.dismiss();
  //    }, (error) => {
  //        this.showMessage('Error descargando archivo pdf' + error);
  //          load.dismiss();
  //    }).catch(err=>{
  //        load.dismiss();
  //    })
  // }
  // openFile(url:string){
  //   console.log("abriendo " + url);
  //   this.fileOpener.open(url, 'application/pdf')
  // .then(() => console.log('File is opened'))
  // .catch(e => console.log('Error openening file', e));
  // }
  saveAndOpenPdf(pdf: string, filename: string) {
    let loading = this.loading.create({
      content:'Abriendo archivo...'
    })
    loading.present();
  const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
  this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), {replace: true})
    .then(() => {
        loading.dismiss();
        this.fileOpener.open(writeDirectory + filename, 'application/pdf')
            .catch(() => {
                console.log('Error opening pdf file');
                loading.dismiss();
            });
    })
    .catch(() => {
        console.error('Error creando pdf');
        loading.dismiss();
    });
}
convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
}
}
