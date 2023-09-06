import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIssuePageRoutingModule } from './view-issue-routing.module';

import { ViewIssuePage } from './view-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewIssuePageRoutingModule
  ],
  declarations: [ViewIssuePage]
})
export class ViewIssuePageModule {}
