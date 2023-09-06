import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorlistPageRoutingModule } from './vendorlist-routing.module';

import { VendorlistPage } from './vendorlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorlistPageRoutingModule
  ],
  declarations: [VendorlistPage]
})
export class VendorlistPageModule {}
