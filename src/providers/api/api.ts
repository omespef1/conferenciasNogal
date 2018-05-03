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
    //this.chargue();
  }
 chargue(){
    this.http.get('assets/data/data.json').subscribe(res=>{
     this.data= res.json();
   })
 }

}
