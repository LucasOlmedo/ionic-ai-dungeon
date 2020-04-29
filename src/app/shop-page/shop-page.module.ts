import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPagePageRoutingModule } from './shop-page-routing.module';

import { ShopPagePage } from './shop-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPagePageRoutingModule
  ],
  declarations: [ShopPagePage]
})
export class ShopPagePageModule {}
