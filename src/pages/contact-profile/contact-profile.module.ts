import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactProfilePage } from './contact-profile';

@NgModule({
  declarations: [
    ContactProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactProfilePage),
  ],
  exports: [
    ContactProfilePage
  ]
})
export class ContactProfilePageModule {}
