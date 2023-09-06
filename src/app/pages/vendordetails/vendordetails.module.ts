import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendordetailsPageRoutingModule } from './vendordetails-routing.module';

import { VendordetailsPage } from './vendordetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendordetailsPageRoutingModule
  ],
  declarations: [VendordetailsPage]
})
export class VendordetailsPageModule {}
