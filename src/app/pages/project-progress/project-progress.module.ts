import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectProgressPageRoutingModule } from './project-progress-routing.module';

import { ProjectProgressPage } from './project-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProjectProgressPageRoutingModule
  ],
  declarations: [ProjectProgressPage]
})
export class ProjectProgressPageModule {}
