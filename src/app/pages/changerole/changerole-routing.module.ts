import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangerolePage } from './changerole.page';

const routes: Routes = [
  {
    path: '',
    component: ChangerolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangerolePageRoutingModule {}
