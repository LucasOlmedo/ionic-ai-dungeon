import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGameSettingsPageRoutingModule } from './main-game-settings-routing.module';

import { MainGameSettingsPage } from './main-game-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainGameSettingsPageRoutingModule
  ],
  declarations: [MainGameSettingsPage]
})
export class MainGameSettingsPageModule {}
