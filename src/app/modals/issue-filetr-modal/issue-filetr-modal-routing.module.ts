import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueFiletrModalPage } from './issue-filetr-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IssueFiletrModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueFiletrModalPageRoutingModule {}
