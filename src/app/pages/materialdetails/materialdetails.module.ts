import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialdetailsPageRoutingModule } from './materialdetails-routing.module';

import { MaterialdetailsPage } from './materialdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialdetailsPageRoutingModule
  ],
  declarations: [MaterialdetailsPage]
})
export class MaterialdetailsPageModule {}
