import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddworkPageRoutingModule } from './addwork-routing.module';

import { AddworkPage } from './addwork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddworkPageRoutingModule
  ],
  declarations: [AddworkPage]
})
export class AddworkPageModule {}
