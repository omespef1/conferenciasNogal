import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController,Refresher} from 'ionic-angular';
import {sponsors} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import {eerevet} from '../../shared/models';
import {ImagePipe} from '../../pipes/image/image';
import {SponsorDetaillPage} from '../sponsor-detaill/sponsor-detaill';
import {UserDataProvider} from '../../providers/user-data/user-data';
/**

/**
 * Generated class for the SponsorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html'

})
export class SponsorsPage {
  public sponsors:sponsors[];
  public sponsorsList:sponsors[];
  private event:eerevet;
  public value:string;
  constructor(private seven:SevenProvider, private nav:NavParams,private toast:ToastController,
  private navCtrl:NavController, private loading:LoadingController,
private userdata:UserDataProvider) {
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
   this.userdata.getDataSponsors(this.event.rev_cont).then(data=>{
     this.sponsors = data;
     this.initializeItems();
     load.dismiss();
     if(this.sponsors==null)
      this.showMessage("No hay patrocinadores para este evento!");
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
    doRefresh(refresher: Refresher) {
     this.userdata.getDataSponsors(this.event.rev_cont,true).then(data=>{
     this.sponsors = data;
        this.initializeItems();
     refresher.complete();
     this.showMessage("Patrocinadores actualizados.");
   })
    }
    initializeItems():void{
      this.sponsorsList = this.sponsors;
    }
    getItems(q: string) {
      console.log(q);
      //Reseteo los items a su estado original
      this.initializeItems();
    //Si el valor es vacío ni filtra ndada
      if (!q || q.trim() === '') {
      return;
      }
      //Realiza el filtrado
      this.sponsorsList = this.sponsorsList.filter((v) =>  v.pat_nomb.toLowerCase().indexOf(q.toLowerCase()) > -1);
}

}
