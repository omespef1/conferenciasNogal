import { Component,ViewChild } from '@angular/core';
import { Platform ,MenuController,NavParams,Events,AlertController,ToastController,Nav,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CalendarioPage,LoginPage,PonentesPage,RegisterPage,SettingsPage,EventDetailsPage,SponsorsPage} from '../shared/pagesPackage';
import {page} from '../shared/models';
import {UserDataProvider} from '../providers/user-data/user-data';
import {SevenProvider} from '../providers/seven/seven';
import {UploadPage} from '../pages/upload/upload';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav
  version:string="2017";
  rootPage:any = LoginPage ;
  pagePonientes = PonentesPage;
  pageLogin = LoginPage;
  pageCalendario = CalendarioPage;
  pageSettings = SettingsPage;
  pageRegister = RegisterPage;
  pageEventDetails = EventDetailsPage;
  pageSponsors: SponsorsPage;
  photo:string;
   public userData:string;
   public user:string;
 public pages:page[];
  public pagesOut:page[];
  constructor(platform: Platform, statusBar: StatusBar, private menu:MenuController,
    splashScreen: SplashScreen,
    public events: Events,
    private alertCtrl:AlertController,
    private userdata:UserDataProvider,
    private seven:SevenProvider,
    private toast:ToastController,
    private modal:ModalController,
  ) {
      platform.ready().then(() => {
      splashScreen.hide();
      statusBar.styleLightContent();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#051467");
      this.userdata.hasLoggedIn().then((hasLoggedIn) => {
          this.enableMenu(hasLoggedIn === true);
        //  this.enableMenu(true);
          this.listenToLoginEvents();
          this.validLogin();
          this.userdata.getUserImage().then(res=>{
            if(res!=undefined){
            this.photo = res;
          }else{
            this.photo = "../assets/user.jpg";
          }
          })
        });

this.pages = [
  new page('Inicio','home',false,CalendarioPage,true),
  new page('Salir','md-log-out',true,LoginPage,true),
]
this.pagesOut = [
  new page('Inicio','home',false,CalendarioPage,true),
  new page('Login','lock',false,LoginPage,true),
  new page('Registro','ios-key',false,RegisterPage,true),
  new page('Chat de eventos','chatboxes',false,LoginPage,true),
  new page('Encuestas','md-help',false,LoginPage,true),
  new page ('Patrocinadores', 'person',false,LoginPage,true)
]
    });


  }
  abrirPagina(pagina:page){
  if(pagina.logOut===true){
   this.userdata.logout();
   this.showMessage('Su sesión se ha cerrado!');
  }
  console.log(pagina.name);
  //this.rootPage = pagina.pageOpen;
  this.nav.setRoot(pagina.pageOpen);
  this.menu.close();
}
   listenToLoginEvents() {
       this.events.subscribe('user:login', () => {
         this.enableMenu(true);
         this.userdata.getUserInfo().then(user=>{
           this.user=user;
         })
       });

       this.events.subscribe('user:logout', () => {
         this.enableMenu(false);
       });
     }
  enableMenu(loggedIn: boolean) {
  this.menu.enable(loggedIn, 'loggedInMenu');
  this.menu.enable(!loggedIn, 'loggedOutMenu');
}
validLogin(){
  this.userdata.hasLoggedIn().then(log=>{
    if(log){
      this.userdata.getUsername().then(user=>{
        this.userdata.getUserInfo().then(info=>{
          this.userdata.login(user,info);
        })
      });
    }
      this.rootPage=CalendarioPage;
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
showMessage(msg:string){
  const toast = this.toast.create({
   message: msg,
   duration: 3000
 }).present();
}
openModal(){
  let mymodal = this.modal.create(UploadPage);
  mymodal.present();
}
}
