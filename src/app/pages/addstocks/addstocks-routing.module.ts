import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstocksPage } from './addstocks.page';

const routes: Routes = [
  {
    path: '',
    component: AddstocksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstocksPageRoutingModule {}
