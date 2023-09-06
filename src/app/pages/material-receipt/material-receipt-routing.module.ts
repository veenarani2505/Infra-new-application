import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReceiptPage } from './material-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReceiptPageRoutingModule {}
