import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprojectsPageRoutingModule } from './addprojects-routing.module';

import { AddprojectsPage } from './addprojects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddprojectsPageRoutingModule
  ],
  declarations: [AddprojectsPage]
})
export class AddprojectsPageModule {}
