import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorDetaillPage } from './sponsor-detaill';

@NgModule({
  declarations: [
    SponsorDetaillPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorDetaillPage),
  ],
  exports: [
    SponsorDetaillPage
  ]
})
export class SponsorDetaillPageModule {}
