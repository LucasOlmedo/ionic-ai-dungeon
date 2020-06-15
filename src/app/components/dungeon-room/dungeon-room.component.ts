import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DungeonService } from 'src/app/dungeon.service';
import { PlayerService } from 'src/app/player.service';
import { Player } from 'src/app/models/player';
import { HelperService } from 'src/app/helper.service';

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
  monsterCurrentHP: number = 100;
  monsterIsDead: boolean = false;
  monsterEXP: number = 0;
  canAtk: boolean = false;
  currentMonster = {
    baseLife: 0,
    exp: 0,
    damage: 0,
  };
  chestGold = 0;

  constructor(
    private loadingCtrl: LoadingController,
    private dungeonService: DungeonService,
    private playerService: PlayerService,
    private helper: HelperService
  ) {
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
    this.chestGold = 0;
    this.monsterIsDead = false;
    this.monsterEXP = 0;
    this.currentMonster = {
      baseLife: 0,
      exp: 0,
      damage: 0,
    };
    this.currentRoom = room;
    this.manageRoom();
  }

  openChest() {
    this.chestOpened = true;
    this.eventDone = true;
    this.player.gold += this.chestGold;
  }

  async battleAction(skill) {
    let auxCurHP = this.monsterCurrentHP - skill.damage;
    this.monsterCurrentHP = auxCurHP <= 0 ? 0 : auxCurHP;

    this.canAtk = false;
    if (this.monsterCurrentHP == 0) {
      this.eventDone = true;
      this.monsterIsDead = true;
      this.player.updateExp(this.currentMonster.exp);
    } else {
      await this.helper.sleep(1000);
      this.canAtk = true;
      this.player.current.life -= this.currentMonster.damage;
      if (this.player.current.life <= 0) {
        this.player.current.life = 0;
      }
    }

    this.changeConditionPlayer();
  }

  private manageRoom() {
    let room = this.currentRoom;
    this.changeConditionPlayer();
    switch (room.action) {
      case 'empty':
        this.eventDone = true;
        break;
      case 'chest':
        this.chestGold = room.actionItem.loot(this.player.level);
        break;
      case 'battle':
        this.currentMonster = room.actionItem;
        this.monsterCurrentHP = room.actionItem.baseLife;
        this.monsterEXP = room.actionItem.exp;
        this.canAtk = true;
        break;
      case 'trap':
        this.eventDone = true;
        this.player.current.life -= room.actionItem.value;
        if (this.player.current.life <= 0) {
          this.player.current.life = 0;
        }
        break;
      case 'curse':
      case 'bless':
        this.actionItemTurn = room.actionItem.turns();
        if (this.actionItemTurn > 0) {
          this.player.conditions.push({
            img: `../assets/images/${room.action}/${room.actionItem.icon}.png`,
            turns: this.actionItemTurn,
            calc: room.actionItem.calc,
            atr: room.actionItem.atr,
            operator: room.actionItem.operator,
          });
        } else {
          room.actionItem.operator == '+' ? this.player.current[room.actionItem.atr] +=
            ~~(room.actionItem.calc(this.player.current[room.actionItem.atr]))
            : this.player.current[room.actionItem.atr] -=
            ~~(room.actionItem.calc(this.player.current[room.actionItem.atr]));

          if (this.player.current[room.actionItem.atr] >= this.player.base[room.actionItem.atr]) {
            this.player.current[room.actionItem.atr] = this.player.base[room.actionItem.atr]
          }

          if (this.player.current[room.actionItem.atr] <= 0) {
            this.player.current[room.actionItem.atr] = 0;
          }
        }
        this.eventDone = true;
        break;
    }
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.operator == '+' ? this.player.current[cnd.atr] += ~~(cnd.calc(this.player.base[cnd.atr]))
        : this.player.current[cnd.atr] -= ~~(cnd.calc(this.player.base[cnd.atr]));
      cnd.turns -= 1;
      if (this.player.current[cnd.atr] <= 0 && (cnd.atr != 'life' || cnd.atr != 'mana')) {
        this.player.current[cnd.atr] = 0;
      }
      if (cnd.turns <= 0 && (cnd.atr != 'life' && cnd.atr != 'mana')) {
        this.player.current[cnd.atr] = this.player.base[cnd.atr];
      }
      return cnd;
    }).filter(cnd => cnd.turns > 0);
  }
}
