import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstRoomPageRoutingModule } from './first-room-routing.module';

import { FirstRoomPage } from './first-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstRoomPageRoutingModule
  ],
  declarations: [FirstRoomPage]
})
export class FirstRoomPageModule {}
