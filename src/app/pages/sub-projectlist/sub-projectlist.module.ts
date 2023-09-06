import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubProjectlistPageRoutingModule } from './sub-projectlist-routing.module';

import { SubProjectlistPage } from './sub-projectlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubProjectlistPageRoutingModule
  ],
  declarations: [SubProjectlistPage]
})
export class SubProjectlistPageModule {}
