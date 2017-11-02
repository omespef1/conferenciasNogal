import { Component } from '@angular/core';
import { IonicPage, ViewController,NavController,NavParams} from 'ionic-angular';

/**
 * Generated class for the ContactProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-profile',
  templateUrl: 'contact-profile.html',
})
export class ContactProfilePage {
infoUser:any;
  constructor(private viewCtrl:ViewController, private nav:NavController,
  private navParam:NavParams) {
  this.infoUser= navParam.get('msg');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactProfilePage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

}
