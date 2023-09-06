import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstocksPageRoutingModule } from './addstocks-routing.module';

import { AddstocksPage } from './addstocks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstocksPageRoutingModule
  ],
  declarations: [AddstocksPage]
})
export class AddstocksPageModule {}
