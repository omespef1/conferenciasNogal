import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
//providers
import {SevenProvider} from '../../providers/seven/seven';
//models
import {eerevet} from '../../shared/models';

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
  constructor(private seven:SevenProvider, private nav:NavParams,
  private loadingCtrl:LoadingController) {
  this.event =  this.nav.get('event');
  }

  ionViewDidLoad() {
    this.GetEeEncev();
  }

  GetEeEncev(){
    let loading = this.loadingCtrl.create({
      content:'Cargando...'
    });
    loading.present();
    this.seven.getEeEncev(this.event.rev_cont).then(resp=>{
      console.log(resp);
      this.questions = resp;
      loading.dismiss();
    }).catch(err=>{
      loading.dismiss();
    })
  }
}
