import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController ,LoadingController} from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';
import {eerevet} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import{UserDataProvider} from '../../providers/user-data/user-data';
import {ImagePipe} from '../../pipes/image/image';
import { Storage } from '@ionic/storage';
import { TutorialPage } from '../../pages/tutorial/tutorial';


/**
 * Generated class for the CalendarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
public listEvents :eerevet[]=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sevenProvider: SevenProvider,
    private toast:ToastController,
    private loading:LoadingController,
    private userdata:UserDataProvider,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
  if (!done) {
    console.log(done);
    this.storage.set('intro-done', true);
    this.navCtrl.setRoot(TutorialPage);
  }
});
    this.getEvents();
  }
  getEvents(){
    let load = this.loading.create({
      content:'Cargando...'
    })
    load.present();
    this.userdata.getDataCalendar().then((data)=>{
    this.listEvents = data;
    load.dismiss();
    }).catch(err=>{
        this.showMessage(err);
    })
  }
  goDetails (event:eerevet){
   this.navCtrl.push(EventDetailsPage,{'event':event});
  }
  doRefresh(refresher: Refresher) {

    this.userdata.getDataCalendar(true).then(data=>{
        this.listEvents = data;
        refresher.complete();
        this.showMessage("La lista de eventos disponibles ha sido actualiada!");
    }).catch(err=>{
        this.showMessage(err);
    })
    }
    showMessage(msg:string){
      const toast = this.toast.create({
       message: msg,
       duration: 3000
     }).present();
    }
}
