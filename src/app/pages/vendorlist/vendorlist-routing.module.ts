import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorlistPage } from './vendorlist.page';

const routes: Routes = [
  {
    path: '',
    component: VendorlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorlistPageRoutingModule {}
