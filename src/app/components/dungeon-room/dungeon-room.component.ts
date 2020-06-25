import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DungeonService } from 'src/app/dungeon.service';
import { PlayerService } from 'src/app/player.service';
import { Player } from 'src/app/models/player';
import { HelperService } from 'src/app/helper.service';
import { EQUIPS } from 'src/app/equip-constants';

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
    name: '',
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
  lootEquip = null;
  playerIsDead: boolean = false;
  currentFloorIndex: number = 0;
  deathCause: string = '';
  canGetLoot: boolean = false;

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
    this.lootEquip = null;
    this.trapped = true;
    this.eventDone = false;
    this.chestOpened = false;
    this.chestGold = 0;
    this.currentRoom = room;
    this.player.roomIndex++;
    this.manageRoom();
  }

  openChest() {
    this.getLootEquip();
    this.canGetLoot = this.player.inventory.filter(t => t == 0).length > 0;
    this.chestOpened = true;
    this.eventDone = true;
    this.player.gold += this.chestGold;
  }

  private getLootEquip() {
    let isEquip = false, prob = [], aux = [{ p: 100, v: true }, { p: 0, v: false }];
    for (let p = 0; p < aux.length; p++) {
      let a = aux[p];
      for (let i = 0; i < a.p; i++) {
        prob.push(a.v);
      }
    }
    isEquip = prob[~~(Math.random() * prob.length)];
    if (isEquip) {
      let match = false;
      this.lootEquip = EQUIPS[~~(Math.random() * EQUIPS.length)];
      let thisEquip = Object.assign({}, this.lootEquip);
      if (thisEquip.type == 'equip') {
        thisEquip.id = this.helper.randomId();
      }
      this.player.inventory.map((t: any) => {
        if (t != 0 && t.id == thisEquip.id) {
          match = true;
          t.count++;
        }
        return t;
      });
      if (!match) {
        let indexLoot = this.player.inventory.indexOf(0);
        if (indexLoot != -1) {
          this.player.inventory[indexLoot] = thisEquip;
        }
      }
    }
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
    let playerVel = ~~(this.player.current.vel + this.player.equipAttr.vel);
    this.canAtk = false;
    if (playerVel >= this.currentMonster.vel) {
      await this.playerAtk(skill);
      if (this.currentMonster.currentLife == 0) {
        this.eventDone = true;
        this.player.updateExp(this.currentMonster.exp);
        this.player.gold += this.currentMonster.gold;
        this.getLootEquip();
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
        this.getLootEquip();
        this.player.killCount++;
      }
    }
    this.canAtk = true;
    this.changeConditionPlayer();
  }

  private async monsterAtk() {
    let magicAtk = false, damage = 0;
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
      damage = this.calcDamage(this.currentMonster.magic,
        (this.player.current.prot + this.player.equipAttr.prot));
    } else {
      damage = this.calcDamage(this.currentMonster.atk,
        (this.player.current.def + this.player.equipAttr.def));
    }

    this.player.currentLife -= damage;

    if (this.player.currentLife <= 0) {
      this.player.currentLife = 0;
      await this.helper.sleep(500);
      this.deathCause = this.currentMonster.name;
      return this.gameOver();
    }
  }

  private async playerAtk(sk) {
    let damage = 0, auxCurHP = 0;
    switch (sk.type) {
      case 'atk':
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 2) + sk.val;
        auxCurHP = this.currentMonster.currentLife - this.calcDamage(damage, this.currentMonster.def);
        break;
      case 'magic':
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 2) + sk.val;
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
        this.player.currentLife += ~~(this.player.baseLife * (sk.val / 100));
        if (this.player.currentLife >= this.player.baseLife) {
          this.player.currentLife = this.player.baseLife;
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
    return damage < 9 ? 9 : damage;
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
          name: '',
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
        let percLife = room.actionItem.value(this.player.baseLife);
        let evasion = ~~(Math.random() * 100);
        if (evasion <= this.player.current.eva) {
          this.trapped = false;
        }
        if (this.trapped) {
          this.player.currentLife -= percLife;
          if (this.player.currentLife <= 0) {
            this.player.currentLife = 0;
            this.deathCause = room.actionItem.location;
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
            title: room.actionItem.title,
          });
        } else {
          switch (room.actionItem.atr) {
            case 'life':
              room.actionItem.operator == '+'
                ? this.player.currentLife += ~~(room.actionItem.calc(this.player.baseLife))
                : this.player.currentLife -= ~~(room.actionItem.calc(this.player.baseLife));
              if (this.player.currentLife >= this.player.baseLife) {
                this.player.currentLife = this.player.baseLife;
              }
              break;
            case 'mana':
              room.actionItem.operator == '+'
                ? this.player.currentMana += ~~(room.actionItem.calc(this.player.baseMana))
                : this.player.currentMana -= ~~(room.actionItem.calc(this.player.baseMana));
              if (this.player.currentMana >= this.player.baseMana) {
                this.player.currentMana = this.player.baseMana;
              }
              break;
            default:
              room.actionItem.operator == '+'
                ? this.player.current[room.actionItem.atr] +=
                ~~(room.actionItem.calc(this.player.base[room.actionItem.atr]))
                : this.player.current[room.actionItem.atr] -=
                ~~(room.actionItem.calc(this.player.base[room.actionItem.atr]));
              break;
          }
        }
        this.eventDone = true;
        break;
    }
  }

  private calcMonster(m, type) {
    let monster = Object.assign({}, m), lvAux = type == 'boss'
      ? (this.player.level - 1) : ~~(Math.random() * (this.player.level - this.currentFloorIndex)
        + this.currentFloorIndex) - 1;
    monster.level = lvAux <= 0 ? 1 : lvAux;
    monster.baseLife = ~~(m.baseLife + (m.baseLife * (monster.level / 1.5))) + (40 * monster.level);
    monster.currentLife = monster.baseLife;
    monster.exp = ~~(m.exp * (monster.level / 2) + m.exp);
    monster.gold = ~~(m.gold * (monster.level / 2));
    monster.atk = ~~(m.atk + (monster.level * 10)) + (5 * monster.level);
    monster.def = ~~(m.def + (monster.level * 9)) + (4 * monster.level);
    monster.magic = ~~(m.magic + (monster.level / 0.08));
    monster.prot = ~~(m.prot + (monster.level / 0.09));
    monster.vel = ~~(m.vel + (monster.level / 0.07));
    return monster;
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.turns -= 1;
      switch (cnd.atr) {
        case 'life':
          cnd.operator == '+'
            ? this.player.currentLife += ~~(cnd.calc(this.player.baseLife))
            : this.player.currentLife -= ~~(cnd.calc(this.player.baseLife));

          if (this.player.currentLife <= 0) {
            this.player.currentLife = 0;
            this.deathCause = cnd.title;
            return this.gameOver();
          }
          break;
        default:
          cnd.operator == '+'
            ? this.player.current[cnd.atr] += ~~(cnd.calc(this.player.base[cnd.atr]))
            : this.player.current[cnd.atr] -= ~~(cnd.calc(this.player.base[cnd.atr]));
          break;
      }
      if (cnd.turns <= 0 && (cnd.atr != 'life' && cnd.atr != 'mana')) {
        this.player.current[cnd.atr] = this.player.base[cnd.atr];
      }
      return cnd;
    }).filter(cnd => cnd.turns > 0);
  }
}
