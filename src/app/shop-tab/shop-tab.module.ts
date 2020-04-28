import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopTabPageRoutingModule } from './shop-tab-routing.module';

import { ShopTabPage } from './shop-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopTabPageRoutingModule
  ],
  declarations: [ShopTabPage]
})
export class ShopTabPageModule {}
