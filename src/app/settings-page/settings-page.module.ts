import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPagePageRoutingModule } from './settings-page-routing.module';

import { SettingsPagePage } from './settings-page.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SettingsPagePageRoutingModule
  ],
  declarations: [SettingsPagePage]
})
export class SettingsPagePageModule { }
