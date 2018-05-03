import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,ToastController,Refresher} from 'ionic-angular';
//providers
import {SevenProvider} from '../../providers/seven/seven';
//models
import {eerevet,eerspas} from '../../shared/models';
import {UserDataProvider} from '../../providers/user-data/user-data';
 import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';
/**
 * Generated class for the AskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html',
})
export class AskPage {
customColors : any;
 public questions: any[];
 public event: eerevet;
 rspas:number[]=[];
 public asi_codi:string;
  constructor(private seven:SevenProvider, private nav:NavParams,
  private loadingCtrl:LoadingController,private toast:ToastController,
  private alert:AlertController,
  private userdata:UserDataProvider,
  private _config:EventConfigurationProvider) {
  this.event =  this.nav.get('event');
  this.customColors = _config.GetCustomColors();
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
    this.userdata.getDataAsk(this.event.rev_cont).then(data=>{
    this.questions= data;
    console.log(data);
    loading.dismiss();
    })
  }

  send(){
          let loading = this.loadingCtrl.create({
          content:'Enviando...'
          });
          loading.present();
          var answers:any[]=[];
          for (var _i = 0; _i < this.rspas.length; _i++) {
          // let answer: eerspas={rev_cont:0,asi_codi:"0",enc_cont:0,den_cont:0};
          let answer:any = {'rev_cont': `${this.event.rev_cont}`,  'asi_codi':`${this.asi_codi}`,'enc_cont':`${Number(_i +1)}`,'den_cont':`${Number(this.rspas[_i])}`,'cab_cont':`${this.questions[0].cab_cont}`};
          answers.push(answer);
          }

          this.seven.setEeRspas(answers).then(resp=>{
          loading.dismiss();
          if(resp.retorno==1){
          this.showToast(resp.txtError);
          return;
          }
          this.showToast("Gracias!");
          }).catch(err=>{
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
    doRefresh(refresher: Refresher) {
      this.userdata.getDataAsk(this.event.rev_cont,true).then(data=>{
        this.questions = data;
        refresher.complete();
        this.showToast("Encuesta actualizada.")
      })

     }

}
