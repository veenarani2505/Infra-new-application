import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialIssuesPageRoutingModule } from './material-issues-routing.module';

import { MaterialIssuesPage } from './material-issues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialIssuesPageRoutingModule
  ],
  declarations: [MaterialIssuesPage]
})
export class MaterialIssuesPageModule {}
