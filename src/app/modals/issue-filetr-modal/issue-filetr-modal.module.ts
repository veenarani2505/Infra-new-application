import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueFiletrModalPageRoutingModule } from './issue-filetr-modal-routing.module';

import { IssueFiletrModalPage } from './issue-filetr-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueFiletrModalPageRoutingModule
  ],
  declarations: [IssueFiletrModalPage]
})
export class IssueFiletrModalPageModule {}
