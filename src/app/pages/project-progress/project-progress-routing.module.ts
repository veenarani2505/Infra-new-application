import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectProgressPage } from './project-progress.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectProgressPageRoutingModule {}
