import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {SevenProvider} from '../../providers/seven/seven';
import {asise} from '../../shared/models';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 asistant: asise;
 signup:any = {username:'', password:'',conpassword:''};
 asi_clav_conf:string;
 asi_clav:string;
 asi_codi:string;
  constructor(private alertCtrl: AlertController,
  private seven:SevenProvider,
  private loadingCtrl:LoadingController
  ) {
  }

  ionViewDidLoad() {
  this.showAlert("Recuerde que para poder registrarse , debe estar previamente vinculado como asistente!","Información")
  }
  showAlert(mensaje:string, titulo:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();

  }


  getAsise(){

  let loading=  this.loadingCtrl.create({
      content:'Cargando...'
    })
    loading.present();
  this.seven.getAsiste(this.signup.username)
      .then(data => {
        this.asistant = data[0];
        if (this.asistant==null){
          loading.dismiss();
          this.showAlert("Debes estar cargado previamente como asistente para porder realizar el registro!","Lo sentimos!")
        }
        else{
        if(this.asistant.asi_clav.length>0)
        {
        loading.dismiss();
        this.showAlert("Ud ya se encuentra registrado, por favor ingrese!","Información");
        }
        else{
          let body:any = JSON.stringify({
            asi_codi:this.signup.username,
            asi_clav: this.signup.password
          })
          this.seven.postAsise(body).then(result=>{
            loading.dismiss();
          if (result>0){
            this.showAlert(this.asistant.asi_nomb + " tu registro fue exitoso! Ya puedes ingresar con tu clave!","Felicidades")
          }
          });
        }
      }
      })
      .catch(error =>{
        console.error(error);
      })
  }


}
