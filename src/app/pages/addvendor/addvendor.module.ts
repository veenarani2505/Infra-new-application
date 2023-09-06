import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddvendorPageRoutingModule } from './addvendor-routing.module';

import { AddvendorPage } from './addvendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddvendorPageRoutingModule
  ],
  declarations: [AddvendorPage]
})
export class AddvendorPageModule {}
