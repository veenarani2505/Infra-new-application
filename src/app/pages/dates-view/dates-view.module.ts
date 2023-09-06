import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatesViewPageRoutingModule } from './dates-view-routing.module';

import { DatesViewPage } from './dates-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatesViewPageRoutingModule
  ],
  declarations: [DatesViewPage]
})
export class DatesViewPageModule {}
