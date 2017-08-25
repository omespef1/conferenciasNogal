import { Component } from '@angular/core';
import { Platform ,MenuController,NavParams,Events,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AskPage , CalendarioPage,LoginPage,PonentesPage,RegisterPage,SettingsPage,EventDetailsPage} from '../shared/pagesPackage';
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
  pageAsk = AskPage;
  pageEventDetails = EventDetailsPage;
   public userData:string;
   public user:string;
 public pages:page[];
  public pagesOut:page[];
  constructor(platform: Platform, statusBar: StatusBar, private menu:MenuController,
    splashScreen: SplashScreen,
    public events: Events,
    private alertCtrl:AlertController,
    private userdata:UserDataProvider,
    private seven:SevenProvider
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
  new page('Inicio','home',false,CalendarioPage),
  new page('Eventos','md-calendar',false,CalendarioPage),
  new page('Encuestas','ios-help',false,AskPage),
  new page('Salir','ios-log-out',true,LoginPage),
]
this.pagesOut = [
  new page('Inicio','home',false,CalendarioPage),
  new page('Login','ios-lock',false,LoginPage),
  new page('Registro','ios-person-add',false,RegisterPage),
  new page('Calendario','md-calendar',false,CalendarioPage),
  new page('Chat de eventos','ios-chatboxes',false,LoginPage),
  new page('Encuestas','ios-help',false,LoginPage),
]
    });

  }
  abrirPagina(pagina:page){
  if(pagina.logOut===true){
   this.userdata.logout();
   this.showAlert('Su sesión se ha cerrado!','Logout')
  }
  this.rootPage = pagina.pageOpen;
  this.menu.close();
}
   listenToLoginEvents() {
       this.events.subscribe('user:login', () => {
         this.enableMenu(true);
         this.userdata.getUserInfo().then(user=>{
           console.log(`${user} es el usuario de esta app`)
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
      this.rootPage=CalendarioPage;

    }
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
