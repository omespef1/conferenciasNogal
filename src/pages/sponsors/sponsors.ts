import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController} from 'ionic-angular';
import {sponsors} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import {eerevet} from '../../shared/models';
import {ImagePipe} from '../../pipes/image/image';
import {SponsorDetaillPage} from '../sponsor-detaill/sponsor-detaill';
/**

/**
 * Generated class for the SponsorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {
  public sponsors:sponsors[];
  private event:eerevet;
  constructor(private seven:SevenProvider, private nav:NavParams,private toast:ToastController,
  private navCtrl:NavController, private loading:LoadingController) {
   this.event   = this.nav.get('event');
  }

  ionViewDidLoad() {
  this.getSponsors();
  }

  getSponsors(){
    let load = this.loading.create({
      content:'Cargando...'
    });
   load.present();
    this.seven.getPatre(this.event.rev_cont).then(resp=>{
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
