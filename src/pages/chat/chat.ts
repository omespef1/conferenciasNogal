import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {eerevet} from '../../shared/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages: Observable<any[]>;
  username: string = '';
  message: string = '';
  time:"";
  // messages: object[] = [];
  ee_revet:eerevet;

  constructor(public db: AngularFireDatabase,
    private userdata:UserDataProvider,
    private load: LoadingController,
    public navCtrl: NavController, private nav: NavParams,
    afDB: AngularFireDatabase) {
      this.messages = afDB.list('ee_chats').valueChanges();
      // console.log(this.messages);
      // this.ee_revet = this.nav.get('event');
    }

    sendMessage() {
    //   if(this.message!=""){
    //   this.db.list('/ee_chats').push({
    //     username: this.username,
    //     message: this.message,
    //     rev_cont:this.ee_revet.rev_cont,
    //     time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
    //   }).then( () => {
    //     // message is sent
    //   }).catch( () => {
    //     // some error. maybe firebase is unreachable
    //   });
    // this.message="";
    // this.scrollToBottom();
    // }
  }

    ionViewDidLoad() {
  this.loadInfo();
    }
    loadInfo(){
      this.userdata.getUserInfo().then(nomb=>{
       this.username = nomb;
      //   this.hasLogginChat();
        //  this.loadMessagues();
        //  this.scrollToBottom();
     })
    }
    ionViewWillLeave(){
      //  this.hasLogOutChat();
    }
    scrollToBottom() {
    this.scrollToBottom();

  }

  hasLogginChat(){
    this.db.list('/ee_chats').push({
      specialMessage: true,
      message: `${this.username} ha ingresado  la conversación del evento.`,
      rev_cont: this.ee_revet.rev_cont,
      time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
    });
  }
  hasLogOutChat(){
    // this._chatSubscription.unsubscribe();
    // this.db.list('/ee_chats').push({
    //   specialMessage: true,
    //   message: `${this.username} ha abandonado  la conversación del evento.`,
    //   rev_cont:this.ee_revet.rev_cont,
    //   time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
    // });
  }
  loadMessagues(){
    // let loading = this.load.create({
    //   'content':'Cargando chats'
    // })
    // loading.present();
    // this._chatSubscription = this.db.list('/ee_chats',{
    //   query:{
    //     orderByChild:'rev_cont',
    //     equalTo:this.ee_revet.rev_cont
    //   }
    // }).subscribe( data => {
    //   loading.dismiss();
    //  this.messages = data;
    // });

  }


  }
