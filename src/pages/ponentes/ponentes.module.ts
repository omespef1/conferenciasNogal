import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PonentesPage } from './ponentes';

@NgModule({
  declarations: [
    PonentesPage,
  ],
  imports: [
    IonicPageModule.forChild(PonentesPage),
  ],
  exports: [
    PonentesPage
  ]
})
export class PonentesPageModule {}
