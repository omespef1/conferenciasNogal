import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {SevenProvider} from '../seven/seven';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventConfigurationProvider {
  public rev_colp:string;
  public rev_cols:string;
  public rev_coll:string;
  public rev_tiec:string;

constructor(private events:Events){
}
public GetCustomColors(main:string=""):any{
  console.log(this.rev_colp);
  let customColor:any ={ rev_cols: this.rev_cols, rev_colp:this.rev_colp, rev_coll: this.rev_coll, rev_tiec: this.rev_tiec};
  return customColor;
}

public setCustomColors (custom:any){
  this.rev_cols = custom.rev_cols;
  this.rev_colp = custom.rev_colp;
  this.rev_coll = custom.rev_coll;
  this.rev_tiec = custom.rev_tiec;
  this.events.publish('user:customColor');
}
}
