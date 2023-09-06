import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrdersListPage } from './purchase-orders-list.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrdersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrdersListPageRoutingModule {}
