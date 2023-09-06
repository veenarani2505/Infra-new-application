import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetslistPage } from './assetslist.page';

const routes: Routes = [
  {
    path: '',
    component: AssetslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetslistPageRoutingModule {}
