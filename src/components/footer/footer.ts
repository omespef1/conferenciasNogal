import { Component } from '@angular/core';
//providers
import {EventConfigurationProvider} from '../../providers/event-configuration/event-configuration';

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'nogal-footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  public customColors: any;
  public version : string;
  public copyRight : string;

  constructor(private _config:EventConfigurationProvider) {
    this.version = "Versión 18.05.01.01";
    this.copyRight ="SEVEN ERP©1992-2018 Digital Ware";
  this.customColors = _config.GetCustomColors();
  console.log('componenter footer cargado');
  }

}
