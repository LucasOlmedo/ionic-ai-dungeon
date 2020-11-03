import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPagePageRoutingModule } from './shop-page-routing.module';

import { ShopPagePage } from './shop-page.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ShopPagePageRoutingModule
  ],
  declarations: [ShopPagePage]
})
export class ShopPagePageModule {}
