import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGameLootPageRoutingModule } from './main-game-loot-routing.module';

import { MainGameLootPage } from './main-game-loot.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MainGameLootPageRoutingModule
  ],
  declarations: [MainGameLootPage]
})
export class MainGameLootPageModule {}
