import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlltransactionsfilterModalPage } from './alltransactionsfilter-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlltransactionsfilterModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlltransactionsfilterModalPageRoutingModule {}
