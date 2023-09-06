import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectProgressListPage } from './project-progress-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectProgressListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectProgressListPageRoutingModule {}
