import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddvendorPage } from './addvendor.page';

const routes: Routes = [
  {
    path: '',
    component: AddvendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddvendorPageRoutingModule {}
