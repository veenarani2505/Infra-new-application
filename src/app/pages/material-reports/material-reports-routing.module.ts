import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReportsPage } from './material-reports.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReportsPage,
    // children: [
    //   {
    //     path: 'material-receipt-list',
    //     loadChildren: () => import('../../pages/material-receipt-list/material-receipt-list.module').then( m => m.MaterialReceiptListPageModule)
    //   },
    //   {
    //     path: 'material-issue-list',
    //     loadChildren: () => import('../../pages/material-issue-list/material-issue-list.module').then( m => m.MaterialIssueListPageModule)
    //   },
      
    // ],
    
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReportsPageRoutingModule {}
