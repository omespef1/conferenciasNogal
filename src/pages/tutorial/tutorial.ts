import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CalendarioPage} from '../calendario/calendario';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the TutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
 @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }
  goEvents(){
    this.navCtrl.push(CalendarioPage);
  }
  goToSlideNext(slide:number) {
   this.slides.slideNext()
 }
 goToSlidePreview(slide:number) {
  this.slides.slidePrev()
}

}
