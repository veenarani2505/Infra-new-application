import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPurchaseOrdersPage } from './add-purchase-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AddPurchaseOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPurchaseOrdersPageRoutingModule {}
