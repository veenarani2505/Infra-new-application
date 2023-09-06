import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MixedMaterialIssuePageRoutingModule } from './mixed-material-issue-routing.module';

import { MixedMaterialIssuePage } from './mixed-material-issue.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    ReactiveFormsModule,
    MixedMaterialIssuePageRoutingModule
  ],
  declarations: [MixedMaterialIssuePage]
})
export class MixedMaterialIssuePageModule {}
