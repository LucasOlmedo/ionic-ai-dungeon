import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGameLootPage } from './main-game-loot.page';

const routes: Routes = [
  {
    path: '',
    component: MainGameLootPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainGameLootPageRoutingModule {}
