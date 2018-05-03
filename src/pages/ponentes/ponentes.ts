import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, ToastController, LoadingController } from 'ionic-angular';
import { eeConfe, eerevet } from '../../shared/models';
import { PonenteDetallePage } from '../../pages/ponente-detalle/ponente-detalle';
import { SevenProvider } from '../../providers/seven/seven';
import { ImagePipe } from '../../pipes/image/image';
import { UserDataProvider } from '../../providers/user-data/user-data';
//providers
import { EventConfigurationProvider } from '../../providers/event-configuration/event-configuration';
/**
 * Generated class for the PonentesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ponentes',
  templateUrl: 'ponentes.html',
})
export class PonentesPage {
  value = '';
  public event: eerevet;
  public speakers: eeConfe[] = [];
  public speakerList: eeConfe[] = [];
  public imgPreview: string;
  public customColors: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private seven: SevenProvider, private toast: ToastController,
    private loading: LoadingController,
    private userdata: UserDataProvider,
    private _config: EventConfigurationProvider
  ) {
    this.event = this.navParams.get('event');
    this.customColors = _config.GetCustomColors();
    console.log(this.customColors);
  }
  ionViewDidLoad() {
    this.getSpeakers();
  }
  goToDetalle(speaker: eeConfe) {
    this.navCtrl.push(PonenteDetallePage, { 'speaker': speaker })
  }
  getSpeakers() {
    let loading = this.loading.create({
      content: 'Cargando...'
    })
    loading.present();
    this.userdata.getDataSpeakers(this.event.rev_cont).then(data => {
      this.speakers = data;
      this.initializeItems()
      loading.dismiss()
      if (this.speakers == null)
        this.showMessage("No hay conferencistas para este evento!");
    })
  }
  doRefresh(refresher: Refresher) {
    this.userdata.getDataSpeakers(this.event.rev_cont, true).then(data => {
      this.speakers = data;
      this.initializeItems();
      refresher.complete();
      this.showMessage("Speakers actualizados!");
    }).catch(err => {
      this.showMessage(err);
    })
  }
  showMessage(msg: string) {
    const toast = this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }
  initializeItems(): void {
    this.speakerList = this.speakers;
  }
  getItems(q: string) {
    //Reseteo los items a su estado original
    this.initializeItems();
    //Si el valor es vacío ni filtra ndada
    if (!q || q.trim() === '') {
      return;
    }
    //Realiza el filtrado
    this.speakerList = this.speakerList.filter((v) => v.ter_noco.toLowerCase().indexOf(q.toLowerCase()) > -1);
  }
}
