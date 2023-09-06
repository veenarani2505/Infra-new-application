import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { DatacollectionPageRoutingModule } from './datacollection-routing.module';

import { DatacollectionPage } from './datacollection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DatacollectionPageRoutingModule
  ],
  declarations: [DatacollectionPage]
})
export class DatacollectionPageModule {}
