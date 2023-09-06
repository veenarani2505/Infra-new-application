import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubprojectsviewPage } from './subprojectsview.page';

const routes: Routes = [
  {
    path: '',
    component: SubprojectsviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubprojectsviewPageRoutingModule {}
