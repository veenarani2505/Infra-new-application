import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectlistPage } from './projectlist.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectlistPageRoutingModule {}
