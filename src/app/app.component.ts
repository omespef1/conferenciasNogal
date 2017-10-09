import { Component } from '@angular/core';
import { Platform ,MenuController,NavParams,Events,AlertController,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CalendarioPage,LoginPage,PonentesPage,RegisterPage,SettingsPage,EventDetailsPage,SponsorsPage} from '../shared/pagesPackage';
import {page} from '../shared/models';
import {UserDataProvider} from '../providers/user-data/user-data';
import {SevenProvider} from '../providers/seven/seven';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage ;
  pagePonientes = PonentesPage;
  pageLogin = LoginPage;
  pageCalendario = CalendarioPage;
  pageSettings = SettingsPage;
  pageRegister = RegisterPage;
  pageEventDetails = EventDetailsPage;
  pageSponsors: SponsorsPage;
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
    private toast:ToastController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.userdata.hasLoggedIn().then((hasLoggedIn) => {
          this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);
        this.listenToLoginEvents();
        this.validLogin();
this.pages = [
  new page('Calendario de eventos','md-calendar',false,CalendarioPage,true),
  new page('Encuestas','ios-help',false,LoginPage,true),
  new page('Salir','ios-log-out',true,LoginPage,true),
]
this.pagesOut = [
  new page('Login','lock',false,LoginPage,true),
  new page('Registro','person-add',false,RegisterPage,true),
  new page('Calendario de eventos','calendar',false,CalendarioPage,true),
  new page('Chat de eventos','chatboxes',false,LoginPage,true),
  new page('Encuestas','help',false,LoginPage,false),
  new page ('Patrocinadores', 'help',false,SponsorsPage,true)
]
    });

  }
  abrirPagina(pagina:page){
  if(pagina.logOut===true){
   this.userdata.logout();
   this.showMessage('Su sesión se ha cerrado!');
  }
  this.rootPage = pagina.pageOpen;
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
}
