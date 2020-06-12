import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DungeonService } from 'src/app/dungeon.service';
import { PlayerService } from 'src/app/player.service';
import { Player } from 'src/app/models/player';

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
  player: Player;
  actionItemTurn: number = 0;
  chestOpened: boolean = false;
  monsterBaseHP: number = 100;
  monsterCurrentHP: number = 100;
  monsterIsDead: boolean = false;
  monsterEXP: number = 0;

  constructor(
    private loadingCtrl: LoadingController,
    private dungeonService: DungeonService,
    private playerService: PlayerService) {
    this.loadingDungeon();
  }

  ngOnInit() { }

  async loadingDungeon() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Carregando...',
    });
    loading.present();
    await this.playerService.getPlayer()
      .subscribe(p => {
        this.player = p;
        return this.dungeonService.generateDungeon().then(result => {
          this.dungeon = result;
          this.currentRoom = this.dungeon[0];
          this.loaded = true;
          if (this.currentRoom.action == 'start') {
            this.eventDone = true;
          }
          loading.dismiss();
        });
      });
  }

  enterRoom(room) {
    this.eventDone = false;
    this.chestOpened = false;
    this.monsterIsDead = false;
    this.monsterEXP = 0;
    this.currentRoom = room;
    console.log(this.currentRoom);
    this.manageRoom();
  }

  openChest() {
    this.chestOpened = true;
    this.eventDone = true;
  }

  battleAction(skill) {
    let auxCurHP = this.monsterCurrentHP - skill.damage;
    this.monsterCurrentHP = auxCurHP <= 0 ? 0 : auxCurHP;

    if (this.monsterCurrentHP == 0) {
      this.eventDone = true;
      this.monsterIsDead = true;
      // Não funciona ainda
      // this.player.exp = this.monsterEXP;
    } else {
      // Monstro ataca
    }

    this.changeConditionPlayer();
  }

  private manageRoom() {
    let room = this.currentRoom;
    this.changeConditionPlayer();
    switch (room.action) {
      case 'empty':
      case 'quest':
        this.eventDone = true;
        break;
      case 'battle':
        this.monsterCurrentHP = this.monsterBaseHP = room.actionItem.baseLife;
        this.monsterEXP = room.actionItem.exp;
        break;
      case 'trap':
        this.eventDone = true;
        break;
      case 'curse':
      case 'bless':
        this.actionItemTurn = room.actionItem.turns();
        if (this.actionItemTurn > 0) {
          this.player.conditions.push({
            img: `../assets/images/${room.action}/${room.actionItem.icon}.png`,
            turns: this.actionItemTurn,
          });
        }
        this.eventDone = true;
        break;
    }
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.turns -= 1;
      return cnd;
    }).filter(cnd => cnd.turns > 0);
  }
}
