import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatacollectionPage } from './datacollection.page';

const routes: Routes = [
  {
    path: '',
    component: DatacollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatacollectionPageRoutingModule {}
