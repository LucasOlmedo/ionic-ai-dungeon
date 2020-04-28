import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigTabPageRoutingModule } from './config-tab-routing.module';

import { ConfigTabPage } from './config-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigTabPageRoutingModule
  ],
  declarations: [ConfigTabPage]
})
export class ConfigTabPageModule {}
