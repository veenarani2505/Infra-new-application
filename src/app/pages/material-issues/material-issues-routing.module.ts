import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssuesPage } from './material-issues.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssuesPageRoutingModule {}
