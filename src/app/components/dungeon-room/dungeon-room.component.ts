import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DungeonService } from 'src/app/dungeon.service';

@Component({
  selector: 'app-dungeon-room',
  templateUrl: './dungeon-room.component.html',
  styleUrls: ['./dungeon-room.component.scss'],
})
export class DungeonRoomComponent implements OnInit {
  dungeon: any;
  currentRoom: any;
  loaded: boolean = false;
  eventDone: boolean = false;

  constructor(private loadingCtrl: LoadingController, private dungeonService: DungeonService) {
    this.loadingDungeon();
  }

  ngOnInit() { }

  async loadingDungeon() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Carregando...',
    });
    await loading.present();
    await this.dungeonService.generateDungeon().then(result => {
      this.dungeon = result;
      this.currentRoom = this.dungeon[0];
      this.loaded = true;
      if (this.currentRoom.action == 'start') {
        this.eventDone = true;
      }
      loading.dismiss();
      console.log(this.currentRoom);
    });
  }

  enterRoom(room) {
    this.eventDone = false;
    this.currentRoom = room;
    console.log(this.currentRoom);
  }

}
