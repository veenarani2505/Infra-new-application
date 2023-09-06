import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkprogressPage } from './workprogress.page';

const routes: Routes = [
  {
    path: '',
    component: WorkprogressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkprogressPageRoutingModule {}
