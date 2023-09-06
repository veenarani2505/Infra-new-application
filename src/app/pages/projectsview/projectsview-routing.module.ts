import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsviewPage } from './projectsview.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsviewPageRoutingModule {}
