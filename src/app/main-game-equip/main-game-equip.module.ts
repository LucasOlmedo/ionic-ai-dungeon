import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGameEquipPageRoutingModule } from './main-game-equip-routing.module';

import { MainGameEquipPage } from './main-game-equip.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MainGameEquipPageRoutingModule
  ],
  declarations: [MainGameEquipPage]
})
export class MainGameEquipPageModule {}
