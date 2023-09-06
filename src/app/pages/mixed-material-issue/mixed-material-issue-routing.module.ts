import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MixedMaterialIssuePage } from './mixed-material-issue.page';

const routes: Routes = [
  {
    path: '',
    component: MixedMaterialIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MixedMaterialIssuePageRoutingModule {}
