import { Component } from '@angular/core';
import { IonicPage,ViewController } from 'ionic-angular';

/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

}
