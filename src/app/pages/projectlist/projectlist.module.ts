import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectlistPageRoutingModule } from './projectlist-routing.module';

import { ProjectlistPage } from './projectlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectlistPageRoutingModule
  ],
  declarations: [ProjectlistPage]
})
export class ProjectlistPageModule {}
