import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriallistPage } from './materiallist.page';

const routes: Routes = [
  {
    path: '',
    component: MateriallistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriallistPageRoutingModule {}
