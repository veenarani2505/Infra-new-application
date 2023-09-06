import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialdetailsPage } from './materialdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialdetailsPageRoutingModule {}
