import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorsPage } from './sponsors';

@NgModule({
  declarations: [
    SponsorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorsPage),
  ],
  exports: [
    SponsorsPage
  ]
})
export class SponsorsPageModule {}
