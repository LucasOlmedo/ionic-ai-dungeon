import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGamePageRoutingModule } from './main-game-routing.module';

import { MainGamePage } from './main-game.page';
import { DungeonRoomComponent } from '../components/dungeon-room/dungeon-room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainGamePageRoutingModule
  ],
  declarations: [MainGamePage, DungeonRoomComponent,]
})
export class MainGamePageModule {}
