import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var google;
/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.initMap();
}
initMap(){
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 18,
      center: {lat: 4.66018, lng: -74.05073}
    });
    var marker = new google.maps.Marker({
         position: {lat: 4.66018, lng: -74.05073},
         map: this.map,
         title: 'Club el Nogal'
       });
}
}
