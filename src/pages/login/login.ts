import { Component } from '@angular/core';
import { IonicPage, NavController ,AlertController} from 'ionic-angular';
import {CalendarioPage} from '../../pages/calendario/calendario';
import { LoadingController } from 'ionic-angular';
import  {RegisterPage} from '../register/register';
import {SevenProvider} from '../../providers/seven/seven';
import  {asise} from '../../shared/models';
import {UserDataProvider} from '../../providers/user-data/user-data';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: any = { username: '', password: '' };
  message:string="";
  returnedAsise:asise;

  public rutaImg:string;
  constructor(public navCtrl: NavController,
    private load :LoadingController,
    private alertCtrl:AlertController,
    private seven:SevenProvider,
    private userdata :UserDataProvider,

  ) {
  }
  ionViewDidLoad() {
    this.rutaImg = "assets/icon/seven.png";
    // this.showFinger();

  }
  loginUser(){
    if(this.login.user!="" && this.login.password!=""){
    if(/^[a-zA-Z0-9]+$/.test(this.login.username)){
    this.validUser();
  }
  else {
      this.showAlert('Usuario inválido, verifique!','Error');
  }
    }
    else {
      this.showAlert('Debe especificar usuario y contraseña!','Error');
    }
  }
  openRegister(){
    this.navCtrl.push(RegisterPage);
  }

  validUser(){
let loading=    this.load.create({
      content:'Validando información...'
    });
    loading.present();
    this.seven.getAsiste(this.login.username).then(resp=>{
      if(resp.length==0){
        this.showAlert("Usuario o contraseña incorrectos!","Lo sentimos!")
        loading.dismiss();
        return;
      }
      this.returnedAsise = resp[0];
      if(this.returnedAsise.asi_clav!= this.login.password){
        this.showAlert("Usuario o contraseña incorrectos!","Lo sentimos!")
        loading.dismiss();
        return;
      }
      loading.dismiss();
      this.userdata.login(this.login.username,this.returnedAsise.asi_nomb + ' ' + this.returnedAsise.asi_apel);
      this.navCtrl.push(CalendarioPage);
    }).catch(resp=>{
      loading.dismiss();
      this.showAlert('Hubo un error de conexión','Lo sentimos!')
    })
  }
  showAlert(mensaje:string, titulo:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();

  }

}
