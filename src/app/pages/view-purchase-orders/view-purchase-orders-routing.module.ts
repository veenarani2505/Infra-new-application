import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPurchaseOrdersPage } from './view-purchase-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPurchaseOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPurchaseOrdersPageRoutingModule {}
