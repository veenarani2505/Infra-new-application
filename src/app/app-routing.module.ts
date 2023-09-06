import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {

    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./pages/landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  },
  {
    path: 'material-issues',
    loadChildren: () => import('./pages/material-issues/material-issues.module').then( m => m.MaterialIssuesPageModule)
  },
  {
    path: 'material-reports',
    loadChildren: () => import('./pages/material-reports/material-reports.module').then( m => m.MaterialReportsPageModule)
  },
  {
    path: 'receipt-details',
    loadChildren: () => import('./pages/receipt-details/receipt-details.module').then( m => m.ReceiptDetailsPageModule)
  },
  {
    path: 'issue-details',
    loadChildren: () => import('./pages/issue-details/issue-details.module').then( m => m.IssueDetailsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'previliges',
    loadChildren: () => import('./pages/previliges/previliges.module').then( m => m.PreviligesPageModule)
  },

  {
    path: 'view-receipt',
    loadChildren: () => import('./pages/view-receipt/view-receipt.module').then( m => m.ViewReceiptPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'view-issue',
    loadChildren: () => import('./pages/view-issue/view-issue.module').then( m => m.ViewIssuePageModule)
  },
  {
    path: 'filter-modal',
    loadChildren: () => import('./modals/filter-modal/filter-modal.module').then( m => m.FilterModalPageModule)
  },
  {
    path: 'issue-filetr-modal',
    loadChildren: () => import('./modals/issue-filetr-modal/issue-filetr-modal.module').then( m => m.IssueFiletrModalPageModule)
  },
  {
    path: 'alltransactionsfilter-modal',
    loadChildren: () => import('./modals/alltransactionsfilter-modal/alltransactionsfilter-modal.module').then( m => m.AlltransactionsfilterModalPageModule)
  },
 
  {
    path: 'addwork',
    loadChildren: () => import('./pages/addwork/addwork.module').then( m => m.AddworkPageModule)
  },
  {
    path: 'approvals',
    loadChildren: () => import('./pages/approvals/approvals.module').then( m => m.ApprovalsPageModule)
  },

  {
    path: 'datacollection',
    loadChildren: () => import('./pages/datacollection/datacollection.module').then( m => m.DatacollectionPageModule)
  },
  {
    path: 'material-receipt',
    loadChildren: () => import('./pages/material-receipt/material-receipt.module').then( m => m.MaterialReceiptPageModule)
  },
  {
    path: 'material-transactions',
    loadChildren: () => import('./pages/material-transactions/material-transactions.module').then( m => m.MaterialTransactionsPageModule)
  },
  {
    path: 'mixed-material-issue',
    loadChildren: () => import('./pages/mixed-material-issue/mixed-material-issue.module').then( m => m.MixedMaterialIssuePageModule)
  },
  {
    path: 'project-progress-list',
    loadChildren: () => import('./pages/project-progress-list/project-progress-list.module').then( m => m.ProjectProgressListPageModule)
  },
  {
    path: 'project-progress',
    loadChildren: () => import('./pages/project-progress/project-progress.module').then( m => m.ProjectProgressPageModule)
  },
  {
    path: 'dates-view',
    loadChildren: () => import('./pages/dates-view/dates-view.module').then( m => m.DatesViewPageModule)
  },
  {
    path: 'view-project-details',
    loadChildren: () => import('./pages/view-project-details/view-project-details.module').then( m => m.ViewProjectDetailsPageModule)
  },
  {
    path: 'purchase-orders-list',
    loadChildren: () => import('./pages/purchase-orders-list/purchase-orders-list.module').then( m => m.PurchaseOrdersListPageModule)
  },
  {
    path: 'add-purchase-orders',
    loadChildren: () => import('./pages/add-purchase-orders/add-purchase-orders.module').then( m => m.AddPurchaseOrdersPageModule)
  },
  {
    path: 'view-purchase-orders',
    loadChildren: () => import('./pages/view-purchase-orders/view-purchase-orders.module').then( m => m.ViewPurchaseOrdersPageModule)
  },
  {
    path: 'workprogress',
    loadChildren: () => import('./pages/workprogress/workprogress.module').then( m => m.WorkprogressPageModule)
  },
  {
    path: 'changerole',
    loadChildren: () => import('./pages/changerole/changerole.module').then( m => m.ChangerolePageModule)
  },
  {
    path: 'assetslist',
    loadChildren: () => import('./pages/assetslist/assetslist.module').then( m => m.AssetslistPageModule)
  },
  {
    path: 'assets',
    loadChildren: () => import('./pages/assets/assets.module').then( m => m.AssetsPageModule)
  },
  {
    path: 'view-asset',
    loadChildren: () => import('./pages/view-asset/view-asset.module').then( m => m.ViewAssetPageModule)
  },
  {
    path: 'company-setting',
    loadChildren: () => import('./pages/company-setting/company-setting.module').then( m => m.CompanySettingPageModule)
  },
  {
    path: 'addprojects',
    loadChildren: () => import('./pages/addprojects/addprojects.module').then( m => m.AddprojectsPageModule)
  },
  {
    path: 'addsubprojects',
    loadChildren: () => import('./pages/addsubprojects/addsubprojects.module').then( m => m.AddsubprojectsPageModule)
  },
  {
    path: 'projectlist',
    loadChildren: () => import('./pages/projectlist/projectlist.module').then( m => m.ProjectlistPageModule)
  },
  {
    path: 'sub-projectlist',
    loadChildren: () => import('./pages/sub-projectlist/sub-projectlist.module').then( m => m.SubProjectlistPageModule)
  },
  {   
    path: 'addstocks',
    loadChildren: () => import('./pages/addstocks/addstocks.module').then( m => m.AddstocksPageModule)
  },
  {
    path: 'projectsview',
    loadChildren: () => import('./pages/projectsview/projectsview.module').then( m => m.ProjectsviewPageModule)
  },
  {
    path: 'subprojectsview',
    loadChildren: () => import('./pages/subprojectsview/subprojectsview.module').then( m => m.SubprojectsviewPageModule)
  },
  {
    path: 'addmaterial',
    loadChildren: () => import('./pages/addmaterial/addmaterial.module').then( m => m.AddmaterialPageModule)
  },
  {
    path: 'addvendor',
    loadChildren: () => import('./pages/addvendor/addvendor.module').then( m => m.AddvendorPageModule)
  },
  {
    path: 'materiallist',
    loadChildren: () => import('./pages/materiallist/materiallist.module').then( m => m.MateriallistPageModule)
  },
  {
    path: 'vendorlist',
    loadChildren: () => import('./pages/vendorlist/vendorlist.module').then( m => m.VendorlistPageModule)
  },
  {
    path: 'materialdetails',
    loadChildren: () => import('./pages/materialdetails/materialdetails.module').then( m => m.MaterialdetailsPageModule)
  },
  {
    path: 'vendordetails',
    loadChildren: () => import('./pages/vendordetails/vendordetails.module').then( m => m.VendordetailsPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
