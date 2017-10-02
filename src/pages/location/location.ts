import { Component ,ViewChild, ElementRef} from '@angular/core';
import { Platform } from 'ionic-angular';
import {SevenProvider} from '../../providers/seven/seven';

declare var google: any;

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
@ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(private seven:SevenProvider,public platform: Platform) {
  }

  ionViewDidLoad() {

      this.seven.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });
        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });
          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }

}
