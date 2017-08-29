import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController,LoadingController} from 'ionic-angular';
import {eeConfe,eerevet} from '../../shared/models';
import {PonenteDetallePage} from '../../pages/ponente-detalle/ponente-detalle';
import {SevenProvider} from '../../providers/seven/seven';
import {ImagePipe} from '../../pipes/image/image';
/**
 * Generated class for the PonentesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ponentes',
  templateUrl: 'ponentes.html',
})
export class PonentesPage {
  public event:eerevet;
  public speakers:eeConfe[]=[];
  public imgPreview:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private seven:SevenProvider,private toast:ToastController,private loading:LoadingController
  ) {
  console.log(this.navParams.get('event'));
  this.event   =   this.navParams.get('event')
  }

  ionViewDidLoad() {
    this.getSpeakers();
  }

  goToDetalle(speaker:eeConfe){
    console.log(speaker);
this.navCtrl.push(PonenteDetallePage,{'speaker':speaker})
  }
  getSpeakers(){
let loading = this.loading.create({
  content:'Cargando...'
})
loading.present();
    this.seven.getSpeakers(this.event.rev_cont)
      .then(data => {
        if (data==undefined){
          this.showMessage("No hay conferencistas para este evento!");
          loading.dismiss();
          return;
        }
          this.speakers = data;
        console.log(data);
        console.log(this.speakers[0].con_foto);
        this.imgPreview = 'data:image/jpeg;base64,' + this.speakers[0].con_foto;
      loading.dismiss();
      })
      .catch(error =>{
        console.error(error);
          loading.dismiss();
      })
  }

  doRefresh(refresher: Refresher) {

    this.seven.getSpeakers(this.event.rev_cont)
      .then(data => {
        this.speakers = data;
        refresher.complete();
        this.showMessage("Los conferencistas han sido actualizados");
        console.log(data);
      })
      .catch(error =>{
        console.error(error);
      })
    }
    showMessage(msg:string){
      const toast = this.toast.create({
       message: msg,
       duration: 3000
     }).present();
    }
}
