import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReceiptPageRoutingModule } from './material-receipt-routing.module';

import { MaterialReceiptPage } from './material-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialReceiptPageRoutingModule
  ],
  declarations: [MaterialReceiptPage]
})
export class MaterialReceiptPageModule {}
