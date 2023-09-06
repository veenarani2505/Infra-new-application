import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAssetPageRoutingModule } from './view-asset-routing.module';

import { ViewAssetPage } from './view-asset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAssetPageRoutingModule
  ],
  declarations: [ViewAssetPage]
})
export class ViewAssetPageModule {}
