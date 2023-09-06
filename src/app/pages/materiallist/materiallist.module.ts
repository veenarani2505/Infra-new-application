import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriallistPageRoutingModule } from './materiallist-routing.module';

import { MateriallistPage } from './materiallist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriallistPageRoutingModule
  ],
  declarations: [MateriallistPage]
})
export class MateriallistPageModule {}
