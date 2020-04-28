import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartGameTabPage } from './start-game-tab.page';

const routes: Routes = [
  {
    path: '',
    component: StartGameTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartGameTabPageRoutingModule {}
