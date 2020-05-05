import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGameCharPage } from './main-game-char.page';

const routes: Routes = [
  {
    path: '',
    component: MainGameCharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainGameCharPageRoutingModule {}
