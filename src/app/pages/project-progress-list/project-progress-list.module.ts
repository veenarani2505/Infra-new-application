import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectProgressListPageRoutingModule } from './project-progress-list-routing.module';

import { ProjectProgressListPage } from './project-progress-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectProgressListPageRoutingModule
  ],
  declarations: [ProjectProgressListPage]
})
export class ProjectProgressListPageModule {}
