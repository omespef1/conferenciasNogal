import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorsListPage } from './sponsors-list';

@NgModule({
  declarations: [
    SponsorsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorsListPage),
  ],
  exports: [
    SponsorsListPage
  ]
})
export class SponsorsListPageModule {}
