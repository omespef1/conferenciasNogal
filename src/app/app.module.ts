import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {LoginPage} from '../pages/login/login';
import {PonentesPage} from '../pages/ponentes/ponentes';
import {PonenteDetallePage} from '../pages/ponente-detalle/ponente-detalle';
import {CalendarioPage} from '../pages/calendario/calendario';
import {SettingsPage} from '../pages/settings/settings';
import {RegisterPage} from '../pages/register/register';
import {AskPage} from '../pages/ask/ask';
import {EventDetailsPage} from '../pages/event-details/event-details';
import {ChatPage} from '../pages/chat/chat';
import {SponsorsPage} from '../pages/sponsors/sponsors';
import {SchedulePage} from '../pages/schedule/schedule';
import {ScheduleDetailsPage} from '../pages/schedule-details/schedule-details';
import { HttpModule} from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';
import {LocationPage} from '../pages/location/location';
import {SponsorDetaillPage} from '../pages/sponsor-detaill/sponsor-detaill';
//providers
import { SevenProvider } from '../providers/seven/seven';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase,AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule}  from 'angularfire2/auth';
import { UserDataProvider } from '../providers/user-data/user-data';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { ImagePipe } from '../pipes/image/image';
import { ApiProvider } from '../providers/api/api';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SocialPipe } from '../pipes/social/social';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ColorsPipe } from '../pipes/colors/colors';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { Keychain } from '@ionic-native/keychain';
enableProdMode();
var config = {
    apiKey: "AIzaSyCprGg7FOPeoUN849WGOPAegmX5IIEDsKM",
    authDomain: "nogalconferencesapp.firebaseapp.com",
    databaseURL: "https://nogalconferencesapp.firebaseio.com",
    projectId: "nogalconferencesapp",
    storageBucket: "nogalconferencesapp.appspot.com",
    messagingSenderId: "901072929655"
  };



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PonentesPage,
    PonenteDetallePage,
    CalendarioPage,
    SettingsPage,
    RegisterPage,
    EventDetailsPage,
    ChatPage,
    SchedulePage,
    ImagePipe,
    ScheduleDetailsPage,
    AskPage,
    LocationPage,
    SponsorsPage,
    SponsorDetaillPage,
    SocialPipe,
    ColorsPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
   AngularFireAuthModule,
   AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp,{
        backButtonText: 'Atrás'
    }),
   AngularFireDatabaseModule,
    HttpModule,
    Ionic2RatingModule ,
      IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PonentesPage,
    PonenteDetallePage,
    CalendarioPage,
    SettingsPage,
    RegisterPage,
    EventDetailsPage,
    ChatPage,
    SchedulePage,
    ScheduleDetailsPage,
    AskPage,
    LocationPage,
    SponsorsPage,
    SponsorDetaillPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SevenProvider,
    UserDataProvider,
    ApiProvider,
    InAppBrowser,
    BrowserTab,
    Keychain,
    KeychainTouchId
  ]
})
export class AppModule {}
