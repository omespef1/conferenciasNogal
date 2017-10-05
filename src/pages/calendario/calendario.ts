import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController ,LoadingController} from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';
import {eerevet} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import {ImagePipe} from '../../pipes/image/image';


/**
 * Generated class for the CalendarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
    private loading:LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.getEvents();
  }
  getEvents(){
    let load = this.loading.create({
      content:'Cargando...'
    })
    load.present();
    this.sevenProvider.getEvents()
      .then(data => {
        this.listEvents = data;
       load.dismiss();
      })
      .catch(error =>{
        load.dismiss();
          this.showMessage(error);
      })
  }
  goDetails (event:eerevet){
    console.log(event);
   this.navCtrl.push(EventDetailsPage,{'event':event});
  }
  doRefresh(refresher: Refresher) {

    this.sevenProvider.getEvents()
      .then(data => {
        this.listEvents = data;
        refresher.complete();
          this.showMessage("Eventos actualizados!");
      })
      .catch(error =>{
        this.showMessage(error);
      })

    }
    showMessage(msg:string){
      const toast = this.toast.create({
       message: msg,
       duration: 3000
     }).present();
    }
}
