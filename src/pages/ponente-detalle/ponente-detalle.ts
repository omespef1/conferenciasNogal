import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController,LoadingController} from 'ionic-angular';
//providers
import { SevenProvider} from '../../providers/seven/seven';
//Models
import {eeConfe,eecalco} from '../../shared/models';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {ImagePipe} from '../../pipes/image/image';

/**
 * Generated class for the PonenteDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ponente-detalle',
  templateUrl: 'ponente-detalle.html',
})
export class PonenteDetallePage {
public speaker :eeConfe;
public loggued:boolean;
public rate:number;
imgPreview:string = null;
ee_calco:eecalco={rev_cont:0,ter_codi:"0",asi_codi:"",cal_valo:0}
  constructor(public navCtrl: NavController,
public navParams: NavParams,
private userdata:UserDataProvider,
private seven:SevenProvider,
private toast:ToastController,
private alert:AlertController,
private loading:LoadingController) {
    this.speaker = this.navParams.get('speaker');
    this.imgPreview = 'data:image/jpeg;base64,' + this.speaker.con_foto;
  }

  ionViewDidLoad() {
    this.userdata.getUsername().then(user=>{
     this.ee_calco.asi_codi= user;})
     this.userdata.hasLoggedIn().then(login=>{
       this.loggued=login;
     })
  }

  // getCalco(){
  //    this.userdata.getUsername().then(user=>{
  //     this.ee_calco.asi_codi= user;
  //     this.ee_calco.rev_cont = this.speaker.rev_cont;
  //     this.ee_calco.ter_codi = this.speaker.ter_codi;
  //     this.seven.getCalco(this.ee_calco).then(resp=>{
  //       this.ee_calco.cal_valo = resp.cal_valo;
  //       if (this.ee_calco.cal_valo>0){
  //           this.rate = this.ee_calco.cal_valo;
  //       }
  //     }).catch(err=>{
  //           this.showToast(err);
  //     })
  //   });
  // }
  showToast(msg:string){
    const toast = this.toast.create({
     message: msg,
     duration: 3000
   }).present();
  }

  setCalco(){
    console.log('entro a enviar');
    let load = this.loading.create({
      'content':'Enviando...',
    });
    load.present();

    this.ee_calco.rev_cont = this.speaker.rev_cont;
    this.ee_calco.ter_codi = this.speaker.ter_codi;
    this.ee_calco.cal_valo = this.rate;
    this.seven.setCalco(this.ee_calco).then(resp=>{
      load.dismiss();
      if(resp===0){
      this.showToast("Hemos recibido tu valoración!")
      }
      if(resp===5){
        this.showToast("Has cambiado tu calificación!");
      }
    }).catch(err=>{
      load.dismiss();
      this.showToast(err);
    })
  }

  showConfirm(title:string,msg:string){
    let confirm = this.alert.create({
      title:title,
      message:msg,
      buttons: [

       {
         text: 'Cancelar',
         handler: () => {
           console.log('Agree clicked');
         }
       },
       {
         text: 'Enviar',
         handler: () => {
           this.setCalco()
         }
       },
     ]
   });
   confirm.present();
  }

  onModelChange(){
    console.log('entro');
    this.showConfirm('Enviar valoración','¿Deseas enviar esta calificación,? Si ya habías calificado a este ponente, tu calificación se actualizará.')
  }
}
