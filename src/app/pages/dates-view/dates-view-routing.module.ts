import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatesViewPage } from './dates-view.page';

const routes: Routes = [
  {
    path: '',
    component: DatesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatesViewPageRoutingModule {}
