import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import {SevenProvider} from '../seven/seven';
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public events: Events,
    public storage: Storage , private sevenProvider:SevenProvider) {

  }
  login(username: string,info:string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setUserInfo(info)
    this.events.publish('user:login');
  };
  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };
  logout(): void {
  this.storage.remove(this.HAS_LOGGED_IN);
  this.storage.remove('username');
    this.storage.remove('userinfo');
  this.events.publish('user:logout');
};
setUsername(username: string): void {
  this.storage.set('username', username);
};
setUserInfo(info: string): void {
  this.storage.set('userinfo', info);
};
getUsername(): Promise<string> {
  return this.storage.get('username').then((value) => {
    return value;
  });
};
getUserInfo(): Promise<string> {
  return this.storage.get('userinfo').then((value) => {
    return value;
  });
};
hasLoggedIn(): Promise<boolean> {
  return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
    return value === true;
  });
};
setDataCalendar(calendars:any):void{
  this.storage.set('calendarevents',calendars)
}

getDataCalendar(): Promise<any>{
  return this.storage.get('calendarevents').then((value)=>{
    console.log(value);
  if(value !=undefined){
    return value;
  }
  return  this.sevenProvider.getEvents()
    .then(data => {
      this.setDataCalendar(data);
      console.log(data);
      return data;
    })
    .catch(error =>{
      return undefined;
    })
  })


};
setDataAgend(agend:any):void{
  console.log("agenda seteada por primera vez es ");
  console.log(agend);
  this.storage.set("dataAgend",agend);
}
getDataAgend(rev_cont:number,refresh:boolean=false):Promise<any>{
  return this.storage.get("dataAgend").then(value=>{
    console.log(refresh);
    console.log(value);
    if(value!=undefined && !refresh){
      console.log("agenda cargada");
     return value;
   }
     return this.sevenProvider.getShedule(rev_cont)
       .then(data => {
        this.setDataAgend(data);
          console.log("agenda actualizada");
         return data;
       })
       .catch(error =>{
        return undefined;
       })
  })

}

setDataSpekaers(data:any):void{
  console.log("speakers almacenados en memoria");
  this.storage.set("dataSpeakers",data)
}
getDataSpeakers(rev_cont:number, refresh:boolean=false):Promise<any>{
  return  this.storage.get("dataSpeakers").then(value=>{
    console.log(value);
    if(value!=undefined && !refresh){
      console.log("speakers leídos de memoria");
      return value;
    }
  return  this.sevenProvider.getSpeakers(rev_cont)
      .then(data => {
        this.setDataSpekaers(data);
        console.log("speakers leídos de bd");
          return data;
      })
      .catch(error =>{
        return undefined;
      })
  })
}
setDataSponsors(data:any):void{
  console.log("Sponsors cargados en memoria");
  this.storage.set("dataSponsors",data);
}
getDataSponsors(rev_cont:number,refresh:Boolean=false):Promise<any>{
  return this.storage.get("dataSponsors").then(value=>{
    if ( value!=undefined && !refresh){
      console.log("sponsors leídos de memoria");
    return value;
  }
  return  this.sevenProvider.getPatre(rev_cont).then(data=>{
    this.setDataSponsors(data);
    console.log("sponsosrs leídos de bd");
    return data;
  })
  })
}
setDataAsk(data:any):void{
  console.log("Encuesta cargada en memoria");
  this.storage.set("dataAsk",data);
}
getDataAsk(rev_cont:number,refresh:boolean=false):Promise<any>{
  return this.storage.get("dataAsk").then(value=>{
    if(value!=undefined && !refresh){
      console.log("Encuesta cargada de memoria");
      return value;
    }
    return  this.sevenProvider.getEeEncev(rev_cont).then(data=>{
      this.setDataAsk(data);
      console.log("Encuesta cargada desde bd");
      return data;
    })
  })
}
}
