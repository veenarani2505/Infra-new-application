import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrdersListPageRoutingModule } from './purchase-orders-list-routing.module';

import { PurchaseOrdersListPage } from './purchase-orders-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrdersListPageRoutingModule
  ],
  declarations: [PurchaseOrdersListPage]
})
export class PurchaseOrdersListPageModule {}
