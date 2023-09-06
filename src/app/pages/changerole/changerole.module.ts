import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangerolePageRoutingModule } from './changerole-routing.module';

import { ChangerolePage } from './changerole.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangerolePageRoutingModule
  ],
  declarations: [ChangerolePage]
})
export class ChangerolePageModule {}
