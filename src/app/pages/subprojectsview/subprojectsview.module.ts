import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubprojectsviewPageRoutingModule } from './subprojectsview-routing.module';

import { SubprojectsviewPage } from './subprojectsview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubprojectsviewPageRoutingModule
  ],
  declarations: [SubprojectsviewPage]
})
export class SubprojectsviewPageModule {}
