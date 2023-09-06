import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIssuePage } from './view-issue.page';

const routes: Routes = [
  {
    path: '',
    component: ViewIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewIssuePageRoutingModule {}
