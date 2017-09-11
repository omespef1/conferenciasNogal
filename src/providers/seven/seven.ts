import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {eecalco} from '../../shared/models';
import {ApiProvider} from '../api/api';
/*
  Generated class for the SevenProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SevenProvider {
  private apiUrl:string = "http://192.168.137.1/NogalConferencesApi/api/";
   private apiAction :string;
  constructor(private http: Http,
  private _api:ApiProvider) {
     this._api.chargue();
  }

  getEvents() {
      this.apiAction = 'eerevet'
      return this.requestGet(this.apiAction);
      }
      getBackground() {
          this.apiAction = 'background';
          return this.requestGet(this.apiAction);
          }
    getSpeakers(event:number) {
        this.apiAction = 'eeconfe/' + event;
       return  this.requestGet(this.apiAction);
        }
    getShedule(event:number){
        this.apiAction = 'eeagend/'+event;
        return this.requestGet(this.apiAction);
        }
        getDays(event:number){
          this.apiAction = 'eeagend/days?rev_cont='+event;
          return this.requestGet(this.apiAction);
        }
    getEeEncev(rev_cont:number){
      this.apiAction = 'eeencev?id='+rev_cont;
      return this.requestGet(this.apiAction);
    }
    getAsiste(asi_codi:string){
      this.apiAction = 'eeasise/'+asi_codi;
      return this.requestGet(this.apiAction);
    }
    getCalco(calco:eecalco){
      let body:any = JSON.stringify({
        asi_codi:calco.asi_codi,
        ter_codi: calco.ter_codi,
        rev_cont:calco.rev_cont
      })
      this.apiAction = 'eecalco/&ee_calco='+body;
      return this.requestGet(this.apiAction);
    }
    setCalco(calco:eecalco){
      let body:any = JSON.stringify({
        asi_codi:calco.asi_codi,
        ter_codi: calco.ter_codi,
        rev_cont:calco.rev_cont,
        cal_valo:calco.cal_valo
      });
      this.apiAction='eecalco';
        return  this.requestPost(this.apiAction,body);
    }
    requestGet(url:string){
      let api = this._api.data.api + this.apiAction;
      console.log(api);
      return this.http.get(api)
      .map(res => res.json())
      .toPromise();
        }


postAsise(body:any){
  this.apiAction='eeasise';
  return  this.requestPost(this.apiAction,body);
}
 private  requestPost(url:string,param:any){
    this.apiAction = url;
      let headers = new Headers({
			'Content-Type': 'application/json'
		});
    let options = new RequestOptions({
  			headers: headers
  		});
      let body:any = param;
      return this.http.post(this._api.data.api+ this.apiAction,body,options)
      .toPromise()
			.then(response => {
        return response.json()}).catch(error =>{
           return error.json().message || 'Error en el servicio, intente más tarde';
         });
    }
}
