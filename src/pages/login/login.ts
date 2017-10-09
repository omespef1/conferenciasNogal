import { Component } from '@angular/core';
import { IonicPage, NavController ,AlertController,Platform,ToastController} from 'ionic-angular';
import {CalendarioPage} from '../../pages/calendario/calendario';
import { LoadingController } from 'ionic-angular';
import  {RegisterPage} from '../register/register';
import {SevenProvider} from '../../providers/seven/seven';
import  {asise} from '../../shared/models';
import {UserDataProvider} from '../../providers/user-data/user-data';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { Keychain } from '@ionic-native/keychain';
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
    private keychainTouchId: KeychainTouchId,
    private keychain: Keychain,
    private platform:Platform,
    private toast:ToastController
  )
  {
  }
  ionViewDidLoad() {
    this.rutaImg = "assets/icon/seven.png";
    this.getAccessTouchId();
  }
  loginUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.login.username)){
    this.validUser();
    }
    else {
    this.showAlert('Usuario inválido, verifique!','Error');
    return;
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
      this.showConfirmTouchID();
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
 getAccessTouchId(){
   if(this.platform.is("ios")){
     this.keychainTouchId.has("passwordCodeAssistant").then(()=>{
       this.keychainTouchId.verify("passwordCodeAssistant","Ingrese su huella dactilar para ingresar").then(pass=>{
          this.login.password = pass;
          this.keychain.get("username").then(user=>{
            this.login.username =user;
             this.validUser();
          })
       })
     }
   ).catch(err=>{
     console.log(err);
   })
   }
 }

 setTouchIdAccess(){
   try{
     console.log("TouchID disponible, se guardará el password");
     this.keychain.set("username",this.login.username,false);
     this.keychainTouchId.save("passwordCodeAssistant",this.login.password);
     console.log("se guardó el password");
   }
   catch(ex){
     this.showAlert(ex,"Error");
   }

  }
  showConfirmTouchID() {
console.log("verificando..");
    try{
      let confirm = this.alertCtrl.create({
        title: 'TouchID',
        message: '¿Deseas acceder a la aplicación con TouchID?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              this.setTouchIdAccess();
            }
          },
          {
            text: 'No',
            handler: () => {
              console.log('No');
            }
          }
        ]
      });

        if(this.platform.is("ios") && this.platform.is("cordova") ){
              this.keychainTouchId.has("passwordCodeAssistant").catch(err=>{
                this.keychainTouchId.isAvailable().then(()=>{
                    confirm.present();
                })

              })
        }
    }
    catch(ex){

      this.showAlert(ex,"Error")
    }

   }
   showMessage(msg:string){
     const toast = this.toast.create({
      message: msg,
      duration: 3000
    }).present();
   }
}
