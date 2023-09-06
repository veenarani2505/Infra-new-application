import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectsviewPageRoutingModule } from './projectsview-routing.module';

import { ProjectsviewPage } from './projectsview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsviewPageRoutingModule
  ],
  declarations: [ProjectsviewPage]
})
export class ProjectsviewPageModule {}
