import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGameEquipPage } from './main-game-equip.page';

const routes: Routes = [
  {
    path: '',
    component: MainGameEquipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainGameEquipPageRoutingModule {}
