import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGameSettingsPage } from './main-game-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MainGameSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainGameSettingsPageRoutingModule {}
