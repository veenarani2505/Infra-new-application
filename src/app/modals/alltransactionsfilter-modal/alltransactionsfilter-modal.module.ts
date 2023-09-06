import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlltransactionsfilterModalPageRoutingModule } from './alltransactionsfilter-modal-routing.module';

import { AlltransactionsfilterModalPage } from './alltransactionsfilter-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlltransactionsfilterModalPageRoutingModule
  ],
  declarations: [AlltransactionsfilterModalPage]
})
export class AlltransactionsfilterModalPageModule {}
