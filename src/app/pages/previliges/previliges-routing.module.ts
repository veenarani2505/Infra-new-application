import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviligesPage } from './previliges.page';

const routes: Routes = [
  {
    path: '',
    component: PreviligesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviligesPageRoutingModule {}
