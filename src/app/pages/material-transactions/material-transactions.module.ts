import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialTransactionsPageRoutingModule } from './material-transactions-routing.module';

import { MaterialTransactionsPage } from './material-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialTransactionsPageRoutingModule
  ],
  declarations: [MaterialTransactionsPage]
})
export class MaterialTransactionsPageModule {}
