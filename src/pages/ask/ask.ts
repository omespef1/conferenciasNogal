import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,ToastController} from 'ionic-angular';
//providers
import {SevenProvider} from '../../providers/seven/seven';
//models
import {eerevet,eerspas} from '../../shared/models';
import {UserDataProvider} from '../../providers/user-data/user-data';
/**
 * Generated class for the AskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html',
})
export class AskPage {
 public questions: any[];
 public event: eerevet;
 rspas:number[]=[];
 public asi_codi:string;
  constructor(private seven:SevenProvider, private nav:NavParams,
  private loadingCtrl:LoadingController,private toast:ToastController,
  private alert:AlertController,
  private userdata:UserDataProvider) {
  this.event =  this.nav.get('event');
  }

  ionViewDidLoad() {
    this.GetEeEncev();
    this.userdata.getUsername().then(user=>{
     this.asi_codi= user;
   })
  }

  GetEeEncev(){
    let loading = this.loadingCtrl.create({
      content:'Cargando...'
    });
    loading.present();
    this.seven.getEeEncev(this.event.rev_cont).then(resp=>{
      this.questions = resp;
      loading.dismiss();
    }).catch(err=>{
      loading.dismiss();
    })
  }

  send(){
console.log(this.rspas)
var answers:eerspas[]=[];
for (var _i = 0; _i < this.rspas.length; _i++) {
  // let answer: eerspas={rev_cont:0,asi_codi:"0",enc_cont:0,den_cont:0};
  let answer: eerspas={rev_cont:0,asi_codi:"0",enc_cont:0,den_cont:0,cab_cont:0};
  answer.rev_cont = this.event.rev_cont;
  answer.asi_codi = this.asi_codi;
  answer.enc_cont = Number(_i +1);
  answer.den_cont = Number(this.rspas[_i]);
  answer.cab_cont = this.questions[0].cab_cont;
  this.seven.setEeRspas(answer).then(resp=>{
    if(resp=="0")
     this.showToast("Hemos recibido tu encuesta! Gracias!")
  }).catch(err=>{
    this.showToast(err);
  })

}

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
          this.send();
         }
       },
     ]
   });
   confirm.present();
  }
  showToast(msg:string){
    const toast = this.toast.create({
     message: msg,
     duration: 3000
   }).present();
  }
}
