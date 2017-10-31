import { Component } from '@angular/core';
import { IonicPage,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import {UserDataProvider} from '../../providers/user-data/user-data';
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
 imagenPreview:string;
  constructor(private viewCtrl:ViewController,private camera: Camera,private imagePicker: ImagePicker,
  private userData:UserDataProvider) {
  }

  ionViewDidLoad() {
    this.load();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  showCamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.userData.setUserImage(this.imagenPreview);
    }, (err) => {
      console.log("Error en cámara", JSON.stringify(err));
     // Handle error
    });
  }
  selectPhoto(){
    let options : ImagePickerOptions = {

    quality:70,
    outputType:1,
    maximumImagesCount:1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
         this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
         this.userData.setUserImage(this.imagenPreview);
      }
    }, (err) => {console.log(JSON.stringify(err));
     });
  }
  load(){
    this.userData.getUserImage().then(photo=>{
      console.log(photo);
      if(photo!=undefined){
      this.imagenPreview = photo;
    }else{
      this.imagenPreview = "../assets/user.jpg";
    }
    })
  }

}
