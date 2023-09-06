import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReportsPageRoutingModule } from './material-reports-routing.module';

import { MaterialReportsPage } from './material-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialReportsPageRoutingModule
  ],
  declarations: [MaterialReportsPage]
})
export class MaterialReportsPageModule {}
