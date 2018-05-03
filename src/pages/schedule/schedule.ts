import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController,LoadingController } from 'ionic-angular';
import {ee_agend,eerevet,eeConfe} from '../../shared/models';
import {SevenProvider} from '../../providers/seven/seven';
import { UserDataProvider} from '../../providers/user-data/user-data'
import {PonenteDetallePage} from '../ponente-detalle/ponente-detalle';
import {ScheduleDetailsPage} from '../schedule-details/schedule-details';
import {ImagePipe} from '../../pipes/image/image';
//providers
 import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
 schedules: ee_agend[]=[];
 days:string[];
 event:eerevet;
  customColors : any={};

  constructor(private seven:SevenProvider,
  nav:NavParams,
  private navCtrl:NavController,
   private toast:ToastController,
   private loading:LoadingController,
   private userdata:UserDataProvider,
    private _config:EventConfigurationProvider
) {
  this.event =  nav.get('event')
      this.customColors = _config.GetCustomColors();
  }

  ionViewDidLoad() {
    this.getShedule();
  }
  getShedule(){
      let load = this.loading.create({
      content:"Cargando",
      });
      load.present();
      this.userdata.getDataAgend(this.event.rev_cont).then(data=>{
      this.schedules = data;
      load.dismiss();
      });
  }
  doRefresh(refresher: Refresher) {
        this.userdata.getDataAgend(this.event.rev_cont,true).then(data=>{
        this.schedules = data;
        this.showMessage("La agenda ha sido actualizada!");
        refresher.complete();
        });

    }
    showMessage(msg:string){
          const toast = this.toast.create({
          message: msg,
          duration: 3000
          }).present();
    }
openSpeaker(schedule:ee_agend){
      let speaker:eeConfe= {rev_cont:schedule.rev_cont, ter_codi:schedule.ter_codi,con_perf:schedule.con_perf,
      ter_noco : schedule.ter_noco,con_foto:schedule.con_foto
      };
      this.navCtrl.push(PonenteDetallePage,{'speaker':speaker})
}

openSchedule(shedule:ee_agend){
  this.navCtrl.push(ScheduleDetailsPage,{'agend':shedule})
}
}
