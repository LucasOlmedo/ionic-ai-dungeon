import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGameCharPageRoutingModule } from './main-game-char-routing.module';

import { MainGameCharPage } from './main-game-char.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainGameCharPageRoutingModule
  ],
  declarations: [MainGameCharPage]
})
export class MainGameCharPageModule {}
