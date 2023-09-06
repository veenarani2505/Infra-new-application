import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubprojectsPage } from './addsubprojects.page';

const routes: Routes = [
  {
    path: '',
    component: AddsubprojectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsubprojectsPageRoutingModule {}
