import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetslistPageRoutingModule } from './assetslist-routing.module';

import { AssetslistPage } from './assetslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetslistPageRoutingModule
  ],
  declarations: [AssetslistPage]
})
export class AssetslistPageModule {}
