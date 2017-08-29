import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController,LoadingController } from 'ionic-angular';
import {ee_agend,eerevet,eeConfe} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import {PonenteDetallePage} from '../ponente-detalle/ponente-detalle';
import {ScheduleDetailsPage} from '../schedule-details/schedule-details';
import {ImagePipe} from '../../pipes/image/image';


@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
 schedules: ee_agend[]=[];
 days:string[];
 event:eerevet;

  constructor(private seven:SevenProvider,
  nav:NavParams,
  private navCtrl:NavController,
   private toast:ToastController,
   private loading:LoadingController
) {
  this.event =  nav.get('event')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.getShedule();
  }
  getShedule(){
    let load = this.loading.create({
      content:"Cargando",
    });
    load.present();
    this.seven.getShedule(this.event.rev_cont)
      .then(data => {
        this.schedules = data;
          load.dismiss();
      })
      .catch(error =>{
          load.dismiss();
        console.error(error);
      })
  }
  doRefresh(refresher: Refresher) {

    this.seven.getShedule(this.event.rev_cont)
      .then(data => {
        this.schedules = data;
        refresher.complete();
        this.showMessage("La agenda ha sido actualizada");
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
openSpeaker(schedule:ee_agend){
  console.log(schedule);
  let speaker:eeConfe= {rev_cont:schedule.rev_cont, ter_codi:schedule.ter_codi,con_perf:schedule.con_perf,
ter_noco : schedule.ter_noco,con_foto:schedule.con_foto
  };
      this.navCtrl.push(PonenteDetallePage,{'speaker':speaker})
}

openSchedule(shedule:ee_agend){
  this.navCtrl.push(ScheduleDetailsPage,{'agend':shedule})
}
}
