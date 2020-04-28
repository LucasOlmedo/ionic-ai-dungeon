import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartGameTabPageRoutingModule } from './start-game-tab-routing.module';

import { StartGameTabPage } from './start-game-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartGameTabPageRoutingModule
  ],
  declarations: [StartGameTabPage]
})
export class StartGameTabPageModule {}
