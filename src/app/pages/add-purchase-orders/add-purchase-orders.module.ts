import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPurchaseOrdersPageRoutingModule } from './add-purchase-orders-routing.module';

import { AddPurchaseOrdersPage } from './add-purchase-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddPurchaseOrdersPageRoutingModule
  ],
  declarations: [AddPurchaseOrdersPage]
})
export class AddPurchaseOrdersPageModule {}
