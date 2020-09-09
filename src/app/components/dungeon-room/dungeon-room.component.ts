import { Component, OnInit } from '@angular/core';
import { LoadingController, AnimationController } from '@ionic/angular';
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
  canGetLoot: boolean = true;
  animateBattleColor: string = '';
  animateBattleText: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private dungeonService: DungeonService,
    private playerService: PlayerService,
    private helper: HelperService,
    private animation: AnimationController,
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
    this.canGetLoot = true;
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
    let isEquip = false, prob = [], aux = [{ p: 60, v: true }, { p: 40, v: false }];
    for (let p = 0; p < aux.length; p++) {
      let a = aux[p];
      for (let i = 0; i < a.p; i++) {
        prob.push(a.v);
      }
    }
    isEquip = prob[~~(Math.random() * prob.length)];
    if (isEquip) {
      let match = false, probEq = [],
        auxEq = [{ p: 70, v: 'equip' }, { p: 20, v: 'potion' }, { p: 10, v: 'bottle' }];
      for (let p = 0; p < auxEq.length; p++) {
        let a = auxEq[p];
        for (let i = 0; i < a.p; i++) {
          probEq.push(a.v);
        }
      }
      let typeEq = probEq[~~(Math.random() * probEq.length)],
        selectedTypeEq = EQUIPS.filter(e => e.type == typeEq);
      let equipChoosed = Object.assign({},
        selectedTypeEq[~~(Math.random() * selectedTypeEq.length)]);
      this.lootEquip = equipChoosed;
      let thisEquip = {
        id: equipChoosed.id || null,
        type: equipChoosed.type || null,
        equiped: equipChoosed.equiped || false,
        equip: equipChoosed.equip || null,
        img: equipChoosed.img || null,
        name: equipChoosed.name || null,
        extra: equipChoosed.extra || null,
        cost: equipChoosed.cost || 0,
        skill: equipChoosed.skill || null,
        count: equipChoosed.count || 1,
        attr: equipChoosed.attr || null,
        value: equipChoosed.value || 0,
      };
      if (thisEquip.type == 'equip') {
        thisEquip.id = this.helper.randomId();
        let auxLv = Math.ceil(Math.random() * this.player.level) + 1;
        thisEquip.extra = thisEquip.extra.map(t => {
          let _t = Object.assign({}, t);
          if (_t.attr == 'crit' || _t.attr == 'eva') {
            _t.value += ~~(auxLv / 5);
          } else {
            _t.value += ~~(((_t.value / 3) * auxLv) / 2);
          }
          return _t;
        });
        thisEquip.name = `${thisEquip.name} Nv ${auxLv}`;
        thisEquip.cost = thisEquip.cost + (18 * auxLv);
      }
      this.player.inventory.filter((t: any) => {
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
    await this.helper.sleep(100);
    this.playerIsDead = true;
    this.eventDone = false;
    this.player.inBattle = false;
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
        this.player.inBattle = false;
        this.player.updateExp(this.currentMonster.exp);
        this.player.gold += this.currentMonster.gold;
        this.getLootEquip();
        this.player.killCount++;
      } else {
        await this.helper.sleep(500);
        await this.monsterAtk();
        await this.helper.sleep(100);
      }
    } else {
      await this.helper.sleep(100);
      await this.monsterAtk();
      await this.helper.sleep(500);
      await this.playerAtk(skill);
      if (this.currentMonster.currentLife == 0) {
        this.eventDone = true;
        this.player.inBattle = false;
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
      let prob = [], aux = [{ p: 35, v: true }, { p: 65, v: false }];
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

    let evasion = ~~(Math.random() * 100) + 1;
    if (evasion <= this.player.current.eva) {
      this.animateBattleColor = 'text-bless-heal';
      this.animateBattleText = 'Você esquivou do ataque!';
      await this.animateBattle().play();
    } else {
      this.player.currentLife -= damage;
      if (this.player.currentLife <= 0) {
        this.player.currentLife = 0;
      }
      this.animateBattleColor = magicAtk ? 'text-curse-burn' : 'text-bless-atk';
      this.animateBattleText = `O inimigo te atacou com ${damage} de Dano ${magicAtk ? 'Mágico' : ''}`;
      await this.animateBattle().play();
    }

    if (this.player.currentLife <= 0) {
      this.player.currentLife = 0;
      await this.helper.sleep(150);
      this.deathCause = this.currentMonster.name;
      return this.gameOver();
    }
  }

  private async playerAtk(sk) {
    let damage = 0, auxCurHP = 0, critChance = ~~(Math.random() * 100) + 1, critDamage = false, calcDamageResult = 0;
    switch (sk.type) {
      case 'atk':
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 2) + sk.val
        this.animateBattleColor = 'text-bless-atk';
        if (critChance <= this.player.current.crit) {
          critDamage = true;
          this.animateBattleColor = 'text-color-equip';
          damage = damage * 1.5;
        }
        calcDamageResult = this.calcDamage(damage, this.currentMonster.def);
        auxCurHP = this.currentMonster.currentLife - calcDamageResult;
        this.animateBattleText = `Você atacou com ${calcDamageResult} de Dano ${critDamage ? 'Crítico' : ''}`;
        break;
      case 'magic':
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 2) + sk.val;
        this.animateBattleColor = 'text-curse-burn';
        if (critChance <= this.player.current.crit) {
          critDamage = true;
          this.animateBattleColor = 'text-color-equip';
          damage = damage * 1.5;
        }
        calcDamageResult = this.calcDamage(damage, this.currentMonster.prot);
        auxCurHP = this.currentMonster.currentLife - calcDamageResult;
        this.animateBattleText = `Você atacou com ${calcDamageResult} de Dano Mágico ${critDamage ? 'Crítico' : ''}`;
        break;
      case 'buff':
        switch (sk.attr) {
          case 'atk':
            this.player.current.atk += ~~(this.player.base.atk * (sk.val / 100));
            this.player.current.magic += ~~(this.player.base.magic * (sk.val / 100));
            break;
          case 'def':
            this.player.current.def += ~~(this.player.base.def * (sk.val / 100));
            this.player.current.prot += ~~(this.player.base.prot * (sk.val / 100));
            break;
          default:
            this.player.current[sk.attr] += ~~(this.player.base[sk.attr] * (sk.val / 100));
            break;
        }
        this.player.conditions.push({
          img: `../assets/images/bless/${sk.attr}.png`,
          turns: 4,
          calc: val => val * (sk.val / 100) + sk.val,
          attr: sk.attr,
          operator: '+',
        });
        this.animateBattleColor = `text-bless-${sk.attr}`;
        this.animateBattleText = `Você usou ${sk.name}`;
        break;
      case 'heal':
        let healLife = ~~(this.player.baseLife * (sk.val / 100));
        this.animateBattleColor = 'text-bless-heal';
        this.animateBattleText = `Você recuperou ${healLife} de HP`;
        this.player.currentLife += healLife;
        if (this.player.currentLife >= this.player.baseLife) {
          this.player.currentLife = this.player.baseLife;
        }
        break;
    }
    this.player.currentMana -= sk.cost;
    if (damage > 0) {
      this.currentMonster.currentLife = auxCurHP <= 0 ? 0 : ~~auxCurHP;
    }
    await this.animateBattle().play();
  }

  private calcDamage(launcherAtk, targetDef) {
    let damage = ~~(launcherAtk - targetDef);
    return damage < 15 ? ~~(Math.random() * 15) + 1 : damage;
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
        this.player.inBattle = true;
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
        let evasion = ~~(Math.random() * 100) + 1;
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
        await this.helper.sleep(500);
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
            attr: room.actionItem.attr,
            operator: room.actionItem.operator,
            title: room.actionItem.title,
          });
        }
        switch (room.actionItem.attr) {
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
          case 'atk':
            if (room.actionItem.operator == '+') {
              this.player.current.atk = this.player.base.atk
                + ~~(room.actionItem.calc(this.player.base.atk));
              this.player.current.magic = this.player.base.magic
                + ~~(room.actionItem.calc(this.player.base.magic));
            } else {
              this.player.current.atk = this.player.base.atk
                - ~~(room.actionItem.calc(this.player.base.atk));
              this.player.current.magic = this.player.base.magic
                - ~~(room.actionItem.calc(this.player.base.magic));
            }
            break;
          case 'def':
            if (room.actionItem.operator == '+') {
              this.player.current.def = this.player.base.def
                + ~~(room.actionItem.calc(this.player.base.def));
              this.player.current.prot = this.player.base.prot
                + ~~(room.actionItem.calc(this.player.base.prot));
            } else {
              this.player.current.def = this.player.base.def
                - ~~(room.actionItem.calc(this.player.base.def));
              this.player.current.prot = this.player.base.prot
                - ~~(room.actionItem.calc(this.player.base.prot));
            }
            break;
          default:
            room.actionItem.operator == '+'
              ? this.player.current[room.actionItem.attr] = this.player.base[room.actionItem.attr] +
              ~~(room.actionItem.calc(this.player.base[room.actionItem.attr]))
              : this.player.current[room.actionItem.attr] = this.player.base[room.actionItem.attr] -
              ~~(room.actionItem.calc(this.player.base[room.actionItem.attr]));
            break;
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
    monster.baseLife = ~~((m.baseLife + (m.baseLife * (monster.level / 1.35))) + (36.5 * monster.level));
    monster.currentLife = ~~monster.baseLife;
    monster.exp = ~~(m.exp * (monster.level / 2) + m.exp);
    monster.gold = ~~(m.gold * (monster.level / 2));
    monster.atk = ~~(m.atk + (monster.level * 8.5)) + (7.5 * monster.level);
    monster.def = ~~(m.def + (monster.level * 1.5)) + (1.5 * monster.level);
    monster.magic = ~~(m.magic + (monster.level * 6)) + (5.75 * monster.level);
    monster.prot = ~~(m.prot + (monster.level / 0.09));
    monster.vel = ~~(m.vel + (monster.level / 0.06));
    return monster;
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.turns -= 1;
      switch (cnd.attr) {
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
        case 'atk':
          if (cnd.operator == '+') {
            this.player.current.atk = this.player.base.atk + ~~(cnd.calc(this.player.base.atk));
            this.player.current.magic = this.player.base.magic + ~~(cnd.calc(this.player.base.magic));
          } else {
            this.player.current.atk = this.player.base.atk - ~~(cnd.calc(this.player.base.atk));
            this.player.current.magic = this.player.base.magic - ~~(cnd.calc(this.player.base.magic));
          }
          break;
        case 'def':
          if (cnd.operator == '+') {
            this.player.current.def = this.player.base.def + ~~(cnd.calc(this.player.base.def));
            this.player.current.prot = this.player.base.prot + ~~(cnd.calc(this.player.base.prot));
          } else {
            this.player.current.def = this.player.base.def - ~~(cnd.calc(this.player.base.def));
            this.player.current.prot = this.player.base.prot - ~~(cnd.calc(this.player.base.prot));
          }
          break;
        default:
          cnd.operator == '+'
            ? this.player.current[cnd.attr] = this.player.base[cnd.attr] + ~~(cnd.calc(this.player.base[cnd.attr]))
            : this.player.current[cnd.attr] = this.player.base[cnd.attr] - ~~(cnd.calc(this.player.base[cnd.attr]));
          break;
      }
      if (cnd.turns <= 0 && (cnd.attr != 'life' && cnd.attr != 'mana')) {
        if (cnd.attr == 'atk') {
          this.player.current.atk = this.player.base.atk;
          this.player.current.magic = this.player.base.magic;
        } 
        if (cnd.attr == 'def') {
          this.player.current.def = this.player.base.def;
          this.player.current.prot = this.player.base.prot;
        }
        if (cnd.attr != 'atk' && cnd.attr != 'def') {
          this.player.current[cnd.attr] = this.player.base[cnd.attr];
        }
      }
      return cnd;
    }).filter(cnd => cnd.turns > 0);
  }

  private animateBattle() {
    return this.animation.create()
      .addElement(document.querySelector('#animate-battle'))
      .duration(800)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(0px)', 'translateY(-50px)')
      .fromTo('opacity', '1', '0');
  }
}
