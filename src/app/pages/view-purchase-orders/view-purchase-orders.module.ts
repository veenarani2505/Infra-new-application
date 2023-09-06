import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPurchaseOrdersPageRoutingModule } from './view-purchase-orders-routing.module';

import { ViewPurchaseOrdersPage } from './view-purchase-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPurchaseOrdersPageRoutingModule
  ],
  declarations: [ViewPurchaseOrdersPage]
})
export class ViewPurchaseOrdersPageModule {}
