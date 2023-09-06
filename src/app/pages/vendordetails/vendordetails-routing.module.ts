import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendordetailsPage } from './vendordetails.page';

const routes: Routes = [
  {
    path: '',
    component: VendordetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendordetailsPageRoutingModule {}
