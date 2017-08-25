import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {
  data: any;
  constructor(public http: Http) {


    console.log('Hello ApiProvider Provider');
  }
 chargue(){
  return this.http.get('assets/data/data.json').subscribe(res=>{
     this.data= res.json();
   })
 }
  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }
  processData(data: any) {
  // just some good 'ol JS fun with objects and arrays
  // build up the data by linking speakers to sessions
  this.data = data.json();
  return this.data;
}
getApi() {
  return this.load().map((data: any) => {
    return data;
  });
}
}
