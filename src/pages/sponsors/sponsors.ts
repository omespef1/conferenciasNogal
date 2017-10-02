import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {sponsors} from '../../shared/models';

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
  public sponsor:sponsors;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.sponsor = { name: 'Bancolombia', description: 'Prueba' , image:'www.google.es' , social:[{link:'WWW.GOOGLE.ES',type:'f'}]};
    console.log(this.sponsor);
  }

}
