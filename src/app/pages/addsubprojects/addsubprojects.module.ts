import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubprojectsPageRoutingModule } from './addsubprojects-routing.module';

import { AddsubprojectsPage } from './addsubprojects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddsubprojectsPageRoutingModule
  ],
  declarations: [AddsubprojectsPage]
})
export class AddsubprojectsPageModule {}
