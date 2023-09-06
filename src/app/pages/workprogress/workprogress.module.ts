import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkprogressPageRoutingModule } from './workprogress-routing.module';

import { WorkprogressPage } from './workprogress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkprogressPageRoutingModule
  ],
  declarations: [WorkprogressPage]
})
export class WorkprogressPageModule {}
