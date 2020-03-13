import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnpaidUserPageRoutingModule } from './unpaid-user-routing.module';

import { UnpaidUserPage } from './unpaid-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnpaidUserPageRoutingModule
  ],
  declarations: [UnpaidUserPage]
})
export class UnpaidUserPageModule {}
