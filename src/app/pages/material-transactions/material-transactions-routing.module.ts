import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialTransactionsPage } from './material-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialTransactionsPageRoutingModule {}
