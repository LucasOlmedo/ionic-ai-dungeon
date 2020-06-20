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
  canAtk: boolean = false;
  currentMonster = {
    baseLife: 0,
    currentLife: 0,
    exp: 0,
    gold: 0,
    atk: 0,
    def: 0,
    magic: 0,
    prot: 0,
    vel: 0,
  };
  trapped: boolean = true;
  chestGold: number = 0;
  playerIsDead: boolean = false;
  currentFloorIndex: number = 0;

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

  nextFloor() {
    this.currentFloorIndex++;
    this.player.floorIndex++;
    this.player.roomIndex = 1;
    this.loadingDungeon();
  }

  enterRoom(room) {
    this.trapped = true;
    this.eventDone = false;
    this.chestOpened = false;
    this.chestGold = 0;
    this.currentRoom = room;
    this.player.roomIndex++;
    this.manageRoom();
  }

  openChest() {
    this.chestOpened = true;
    this.eventDone = true;
    this.player.gold += this.chestGold;
  }

  async gameOver() {
    await this.helper.sleep(250);
    this.playerIsDead = true;
    this.eventDone = false;
    let toolbars = document.getElementsByTagName('ion-toolbar')
    for (let i = 0; i < toolbars.length; i++) {
      toolbars[i].style.opacity = '0';
    }
    return false;
  }

  async battleAction(skill) {
    this.canAtk = false;
    if (this.player.current.vel >= this.currentMonster.vel) {
      await this.playerAtk(skill);
      if (this.currentMonster.currentLife == 0) {
        this.eventDone = true;
        this.player.updateExp(this.currentMonster.exp);
        this.player.gold += this.currentMonster.gold;
        this.player.killCount++;
      } else {
        await this.helper.sleep(500);
        await this.monsterAtk();
      }
    } else {
      await this.monsterAtk();
      await this.helper.sleep(500);
      await this.playerAtk(skill);
      if (this.currentMonster.currentLife == 0) {
        this.eventDone = true;
        this.player.updateExp(this.currentMonster.exp);
        this.player.gold += this.currentMonster.gold;
        this.player.killCount++;
      }
    }
    this.canAtk = true;
    this.changeConditionPlayer();
  }

  private async monsterAtk() {
    let magicAtk = false;
    if (this.currentMonster.magic > 0) {
      let prob = [], aux = [{ p: 30, v: true }, { p: 70, v: false }];
      for (let p = 0; p < aux.length; p++) {
        let a = aux[p];
        for (let i = 0; i < a.p; i++) {
          prob.push(a.v);
        }
      }
      magicAtk = prob[~~(Math.random() * prob.length)];
    }

    if (magicAtk) {
      this.player.current.life -= this.calcDamage(this.currentMonster.magic, this.player.current.prot);
    } else {
      this.player.current.life -= this.calcDamage(this.currentMonster.atk, this.player.current.def);
    }
    if (this.player.current.life <= 0) {
      this.player.current.life = 0;
      await this.helper.sleep(500);
      return this.gameOver();
    }
  }

  private async playerAtk(sk) {
    let damage = 0, auxCurHP = 0;
    switch (sk.type) {
      case 'atk':
        damage = ~~((this.player.current[sk.attr] / 2) + sk.val);
        auxCurHP = this.currentMonster.currentLife - this.calcDamage(damage, this.currentMonster.def);
        break;
      case 'magic':
        damage = ~~((this.player.current[sk.attr] / 2) + sk.val);
        auxCurHP = this.currentMonster.currentLife - this.calcDamage(damage, this.currentMonster.prot);
        break;
      case 'buff':
        this.player.current[sk.attr] += ~~(this.player.base[sk.attr] * (sk.val / 100));
        this.player.conditions.push({
          img: `../assets/images/bless/${sk.attr}.png`,
          turns: 3,
          calc: val => val * (sk.val / 100),
          atr: sk.attr,
          operator: '+',
        });
        break;
      case 'heal':
        this.player.current[sk.attr] += ~~(this.player.base[sk.attr] * (sk.val / 100));
        if (this.player.current[sk.attr] >= this.player.base[sk.attr]) {
          this.player.current[sk.attr] = this.player.base[sk.attr];
        }
        break;
    }
    this.player.current.mana -= sk.cost;
    if (damage > 0) {
      this.currentMonster.currentLife = auxCurHP <= 0 ? 0 : auxCurHP;
    }
  }

  private calcDamage(launcherAtk, targetDef) {
    let damage = launcherAtk - targetDef;
    return damage < 7 ? 7 : damage;
  }

  private async manageRoom() {
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
      case 'boss':
        this.currentMonster = {
          baseLife: 0,
          currentLife: 0,
          exp: 0,
          gold: 0,
          atk: 0,
          def: 0,
          magic: 0,
          prot: 0,
          vel: 0,
        };
        this.currentMonster = this.calcMonster(room.actionItem, room.action);
        this.canAtk = true;
        break;
      case 'trap':
        let percLife = room.actionItem.value(this.player.base.life);
        let evasion = ~~(Math.random() * 100);
        if (evasion <= this.player.current.eva) {
          this.trapped = false;
        }
        if (this.trapped) {
          this.player.current.life -= percLife;
          if (this.player.current.life <= 0) {
            this.player.current.life = 0;
            return this.gameOver();
          }
        }
        await this.helper.sleep(300);
        this.eventDone = true;
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
            ~~(room.actionItem.calc(this.player.base[room.actionItem.atr]))
            : this.player.current[room.actionItem.atr] -=
            ~~(room.actionItem.calc(this.player.base[room.actionItem.atr]));

          if (this.player.current[room.actionItem.atr] >= this.player.base[room.actionItem.atr]) {
            this.player.current[room.actionItem.atr] = this.player.base[room.actionItem.atr];
          }
          if (this.player.current[room.actionItem.atr] <= 0) {
            this.player.current[room.actionItem.atr] = 0;
          }
          if (this.player.current.life <= 0) {
            this.player.current.life = 0;
            return this.gameOver();
          }
        }
        this.eventDone = true;
        break;
    }
  }

  private calcMonster(m, type) {
    let monster = Object.assign({}, m), lvAux = type == 'boss'
      ? this.player.level : ~~(Math.random() * (this.player.level - this.currentFloorIndex)
        + this.currentFloorIndex);
    monster.level = lvAux == 0 ? 1 : lvAux;
    monster.baseLife = ~~(m.baseLife + (m.baseLife * (monster.level / 2))) + 35;
    monster.currentLife = monster.baseLife;
    monster.exp = ~~(m.exp * (monster.level / 2) + m.exp);
    monster.gold = ~~(m.gold * (monster.level / 2));
    monster.atk = ~~(m.atk + (monster.level / 0.05));
    monster.def = ~~(m.def + (monster.level / 0.08));
    monster.magic = ~~(m.magic + (monster.level / 0.05));
    monster.prot = ~~(m.prot + (monster.level / 0.07));
    monster.vel = ~~(m.vel + (monster.level / 0.06));
    return monster;
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.operator == '+' ? this.player.current[cnd.atr] += ~~(cnd.calc(this.player.base[cnd.atr]))
        : this.player.current[cnd.atr] -= ~~(cnd.calc(this.player.base[cnd.atr]));
      cnd.turns -= 1;
      if (this.player.current[cnd.atr] <= 0 && (cnd.atr != 'life' || cnd.atr != 'mana')) {
        this.player.current[cnd.atr] = 0;
        return this.gameOver();
      }
      if (cnd.turns <= 0 && (cnd.atr != 'life' && cnd.atr != 'mana')) {
        this.player.current[cnd.atr] = this.player.base[cnd.atr];
      }
      return cnd;
    }).filter(cnd => cnd.turns > 0);
  }
}
