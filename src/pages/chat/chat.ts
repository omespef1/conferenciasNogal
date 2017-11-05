import { Component ,ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {UserDataProvider} from '../../providers/user-data/user-data';
import {eerevet} from '../../shared/models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Content ,ModalController,} from 'ionic-angular';
import {ContactProfilePage} from '../contact-profile/contact-profile';
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
  messages: any[];
  username: string = '';
  message: string = '';
  time:"";
  image:string;
  // messages: object[] = [];
  ee_revet:eerevet;

  constructor(public db: AngularFireDatabase,
    private userdata:UserDataProvider,
    private load: LoadingController,
    public navCtrl: NavController, private nav: NavParams,
    private afDB: AngularFireDatabase,
    private modal:ModalController,) {
      this.userdata.getUserInfo().then(nomb=>{
       this.username = nomb;
     })
     this.userdata.getUserImage().then(img=>{
       if(img==undefined){
         this.image="assets/user.jpg";
       }else {
         this.image= img;
       }

     })
      this.ee_revet = this.nav.get('event');

    }

    sendMessage() {
      if(this.message!=""){
        this.afDB.list(`/ee_chats/${this.ee_revet.rev_cont}`).push({
          username: this.username,
          message: this.message,
          time:new Date().toLocaleDateString() + " " + new Date().getHours() +":" + new Date().getMinutes()
        }).then(()=>{
          this.content.scrollToBottom();
        })
this.message="";

    }
  }

    ionViewDidLoad() {
      this.loadMessagues();

    }

    ionViewWillLeave(){
      //  this.hasLogOutChat();
    }

openUser(message:any){
    let mymodal = this.modal.create(ContactProfilePage,{'msg':message});
    mymodal.present();
}


  loadMessagues(){
    let loading = this.load.create({
      'content':'Cargando chats'
    })
    loading.present();
    this.afDB.list(`/ee_chats/${this.ee_revet.rev_cont}`).valueChanges().subscribe(res=>{
      this.messages = res;
      console.log(res);
      loading.dismiss();
      this.content.scrollToBottom();
    })
  }


  }
