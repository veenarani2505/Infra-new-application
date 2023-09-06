import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubProjectlistPage } from './sub-projectlist.page';

const routes: Routes = [
  {
    path: '',
    component: SubProjectlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubProjectlistPageRoutingModule {}
