import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {eerevet} from '../../shared/models';
import { Content } from 'ionic-angular';
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
 @ViewChild(Content) content: Content;
  username: string = '';
  message: string = '';
  time:"";
  _chatSubscription;
  messages: object[] = [];
  ee_revet:eerevet;

  constructor(public db: AngularFireDatabase,
    private userdata:UserDataProvider,
    private load: LoadingController,
    public navCtrl: NavController, private nav: NavParams) {
      this.ee_revet = this.nav.get('event');

    }

    sendMessage() {
      if(this.message!=""){
      this.db.list('/ee_chats').push({
        username: this.username,
        message: this.message,
        rev_cont:this.ee_revet.rev_cont,
        time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
      }).then( () => {
        // message is sent
      }).catch( () => {
        // some error. maybe firebase is unreachable
      });
    this.scrollToBottom();
    this.message="";
    }
  }

    ionViewDidLoad() {
  this.loadInfo();
    }
    loadInfo(){
      let loading = this.load.create({
        'content':'Cargando chats'
      })
      loading.present();
      this.userdata.getUserInfo().then(nomb=>{
       this.username = nomb;
         this.hasLogginChat();
         this.loadMessagues();
         loading.dismiss();
     })
    }
    ionViewWillLeave(){
        this.hasLogOutChat();
    }
    scrollToBottom() {
    this.content.scrollToBottom(300);
  }

  hasLogginChat(){
    this.db.list('/ee_chats').push({
      specialMessage: true,
      message: `${this.username} ha ingresado  la conversación del evento.`,
      rev_cont: this.ee_revet.rev_cont,
      time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
    });
    this.scrollToBottom();
  }
  hasLogOutChat(){
    this._chatSubscription.unsubscribe();
    this.db.list('/ee_chats').push({
      specialMessage: true,
      message: `${this.username} ha abandonado  la conversación del evento.`,
      rev_cont:this.ee_revet.rev_cont,
      time:new Date().toLocaleDateString()
    });
  }
  loadMessagues(){
    this._chatSubscription = this.db.list('/ee_chats',{
      query:{
        orderByChild:'rev_cont',
        equalTo:this.ee_revet.rev_cont
      }
    }).subscribe( data => {
     this.messages = data;
      console.log("cargue el chat");
      this.scrollToBottom();
    });

  }


  }
