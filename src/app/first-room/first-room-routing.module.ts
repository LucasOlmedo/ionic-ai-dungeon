import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstRoomPage } from './first-room.page';

const routes: Routes = [
  {
    path: '',
    component: FirstRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstRoomPageRoutingModule {}
