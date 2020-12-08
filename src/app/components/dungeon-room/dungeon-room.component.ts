import { Component, OnInit } from '@angular/core';
import { LoadingController, AnimationController, AlertController, ToastController } from '@ionic/angular';
import { DungeonService } from 'src/app/dungeon.service';
import { PlayerService } from 'src/app/player.service';
import { Player } from 'src/app/models/player';
import { HelperService } from 'src/app/helper.service';
import { EQUIPS } from 'src/app/equip-constants';
import { FINAL_BOSS } from 'src/app/bestiary-constants';
import { BOSS_SPEAK } from 'src/app/dungeon-constants';
import { AdOptions } from 'capacitor-admob';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/config.service';
import { AudioService } from 'src/app/audio.service';
import { Storage } from '@ionic/storage';

const { AdMob } = Plugins;

@Component({
  selector: 'app-dungeon-room',
  templateUrl: './dungeon-room.component.html',
  styleUrls: ['./dungeon-room.component.scss'],
})
export class DungeonRoomComponent implements OnInit {

  lang: any;
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
    sound: null,
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
  canRevive: boolean = true;
  canChestReward: boolean = false;
  isMerchant: boolean = false;
  merchantItems = [];
  isBossBattle: boolean = false;
  trapDamage = 0;

  options: AdOptions = {
    // PROD ADS
    adId: 'ca-app-pub-4059005643306368/4060920978',
    // TEST ADS
    // adId: 'ca-app-pub-3940256099942544/5224354917',
  }

  optionsInt: AdOptions = {
    // PROD ADS
    adId: 'ca-app-pub-4059005643306368/9631784186',
    // TEST ADS
    // adId: 'ca-app-pub-3940256099942544/5224354917',
  }

  private storage: Storage = new Storage({ name: '_ionicstorage' });

  constructor(
    private loadingCtrl: LoadingController,
    private dungeonService: DungeonService,
    private playerService: PlayerService,
    private helper: HelperService,
    private animation: AnimationController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public translate: TranslateService,
    private config: ConfigService,
    private audio: AudioService,
  ) {
    this.loadingDungeon();
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.initLang();
  }

  async initLang() {
    await this.config.getLanguage()
      .subscribe(val => {
        this.lang = this.config.parseLang(val);
        this.translate.use(this.lang);
      });
  }

  async loadingDungeon(nextFloor?) {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: this.translate.instant('in-game.dungeon.loading'),
    });
    loading.present();

    await AdMob.prepareInterstitial(this.optionsInt);
    await this.playerService.getPlayer().subscribe(async p => {
      this.player = p;
      await this.storage.get('saveGame').then(async v => {
        if (nextFloor) {
          try {
            await AdMob.showInterstitial();
          } catch (error) {
            let toast = await this.toastCtrl.create({
              message: this.translate.instant('ads.fail'),
              position: 'top',
              duration: 1500,
            });
            await toast.present();
          }
          return this.dungeonService.generateDungeon().then(result => {
            this.dungeon = result;
            this.currentRoom = this.dungeon[0];
            this.loaded = true;
            if (this.currentRoom.action == 'start') {
              this.eventDone = true;
            }
            this.isMerchant = false;
            loading.dismiss();
          });
        } else {
          if (v == false) {
            return this.dungeonService.generateDungeon().then(result => {
              this.dungeon = result;
              this.currentRoom = this.dungeon[0];
              this.loaded = true;
              if (this.currentRoom.action == 'start') {
                this.eventDone = true;
              }
              this.isMerchant = false;
              loading.dismiss();
            });
          } else {
            let save = JSON.parse(v);
            this.currentRoom = save.room;
            this.currentFloorIndex = save.currentFloorIndex;
            this.loaded = true;
            this.enterRoom(save.room);
            this.isMerchant = false;
            await loading.dismiss();
          }
        }
      });
    });
  }

  async nextFloor() {
    await this.audio.playEffect('door');
    this.currentFloorIndex++;
    this.player.floorIndex++;
    this.player.roomIndex = 1;
    this.loadingDungeon(true);
  }

  async visitMerchant() {
    await this.audio.playEffect('next');
    let potionLife = EQUIPS.find(t => t.id == 1),
      potionMana = EQUIPS.find(t => t.id == 2),
      equips = EQUIPS.filter(t => t.type == 'equip');

    potionLife.name = this.translate.instant(potionLife.name);
    potionMana.name = this.translate.instant(potionMana.name);
    this.merchantItems = [];
    this.merchantItems.push(Object.assign({}, potionLife));
    this.merchantItems.push(Object.assign({}, potionMana));
    while (this.merchantItems.length != 12) {
      let randomEquip = equips[~~(Math.random() * equips.length)],
        cloneEquip = Object.assign({}, randomEquip);
      if (this.merchantItems.find(t => t.img == cloneEquip.img)) {
        continue;
      }
      this.merchantItems.push(this.modifyEquip(cloneEquip));
    }
    this.isMerchant = true;
  }

  private modifyEquip(equip) {
    equip.id = this.helper.randomId();
    let auxLv = Math.ceil(Math.random() * this.player.level) + 1;
    equip.extra = equip.extra.map(t => {
      let _t = Object.assign({}, t);
      if (_t.attr == 'crit' || _t.attr == 'eva') {
        _t.value += ~~(auxLv / 5);
      } else {
        _t.value += ~~(((_t.value / 3) * auxLv) / 2);
      }
      return _t;
    });
    equip.name = `${this.translate.instant(equip.name)} Lv ${auxLv}`;
    equip.cost = ~~(equip.cost + (12 * auxLv));
    return equip;
  }

  async showMerchantItem(equip) {
    let costValue = ~~(equip.cost * ((this.player.level / 2) + 3)), messageText = '', attribText = '';
    if (equip.type == 'potion') {
      let slotAttr = '';
      if (equip.attr == 'life') {
        slotAttr = 'HP';
        messageText = `${equip.name}<br>
          ${this.translate.instant('item.term.recover', { val: equip.value, attr: slotAttr })}<br>`;
      }
      if (equip.attr == 'mana') {
        slotAttr = 'Mana';
        messageText = `${equip.name}<br>
        ${this.translate.instant('item.term.recover', { val: equip.value, attr: slotAttr })}<br>`;
      }
      if (equip.attr == 'exp') {
        slotAttr = 'EXP';
        messageText = `${equip.name}<br>
        ${this.translate.instant('item.term.add', { val: equip.value, attr: slotAttr })} ${equip.value}<br>`;
      }
    } else {
      let equipExtra = equip.extra;
      attribText = equipExtra.map(t => `+ ${t.value} ${t.attr == 'crit' || t.attr == 'eva' ? '%' : ''} 
        ${this.translate.instant('player.attr.' + t.attr)}`).join('<br>');

      messageText = `${equip.name}`;
      if (equip.skill != null) {
        let skillValue = '';
        switch (equip.skill.type) {
          case 'atk':
            skillValue = this.translate.instant('item.term.atk-damage', { val: equip.skill.val });
            break;
          case 'magic':
            skillValue = this.translate.instant('item.term.mgc-damage', { val: equip.skill.val });
            break;
          case 'buff':
            skillValue = `+ ${equip.skill.val}% ${this.translate.instant('player.attr.' + equip.skill.attr)} por 4 Turnos`;
            break;
          case 'heal':
            skillValue = this.translate.instant('item.term.heal', { val: equip.skill.val });
            break;
          default:
            skillValue = '';
            break;
        }
        attribText += `<br><br>
          <ion-label>
            <small>
              ${this.translate.instant('item.term.hab', { name: this.translate.instant(equip.skill.name) })}<br>
              ${this.translate.instant('item.term.cost', { val: equip.skill.cost })}<br>
              ${skillValue}
            </small>
          </ion-label>`;
      }
    }
    let equipMsgLabel = equip.type == 'equip' ? `${messageText}<br><br>${attribText}<br>` : `${messageText}`;
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('item.alert.buy'),
      message: `${equipMsgLabel}<br>${this.translate.instant('item.alert.price', { value: ~~costValue })}`,
      buttons: [
        {
          text: this.translate.instant('no'),
          role: 'cancel',
          cssClass: 'confirm-quit',
          handler: async () => await this.audio.playEffect('button'),
        },
        {
          text: this.translate.instant('yes'),
          cssClass: 'sell-item',
          handler: async () => {
            let cloneEquip = Object.assign({}, equip);
            let playerGold = ~~this.player.gold, hasSlot = this.player.inventory.indexOf(0);
            if (playerGold >= costValue) {
              if (hasSlot != -1) {
                if (cloneEquip.type == 'potion') {
                  let match = false;
                  this.player.inventory.filter((t: any) => {
                    if (t != 0 && t.id == cloneEquip.id) {
                      match = true;
                      t.count++;
                    }
                    return t;
                  });
                  if (!match) {
                    let indexLoot = this.player.inventory.indexOf(0);
                    if (indexLoot != -1) {
                      this.player.inventory[indexLoot] = cloneEquip;
                    }
                  }
                } else {
                  let indexLoot = this.player.inventory.indexOf(0);
                  if (indexLoot != -1) {
                    this.player.inventory[indexLoot] = cloneEquip;
                  }
                }
                this.player.gold -= ~~costValue;
                equip.img = null;
                await this.audio.playEffect('coin');
              } else {
                let toast = await this.toastCtrl.create({
                  message: this.translate.instant('item.toast.full'),
                  position: 'top',
                  duration: 1500,
                });
                await this.audio.playEffect('error');
                await toast.present();
              }
            } else {
              let toast = await this.toastCtrl.create({
                message: this.translate.instant('item.toast.no-gold'),
                position: 'top',
                duration: 1500,
              });
              await this.audio.playEffect('error');
              await toast.present();
            }
          },
        },
      ],
    });
    await this.audio.playEffect('button');
    await alert.present();
  }

  async enterRoom(room) {
    await this.audio.playEffect('next');
    this.lootEquip = null;
    this.trapped = true;
    this.eventDone = false;
    this.chestOpened = false;
    this.canChestReward = false;
    this.chestGold = 0;
    this.currentRoom = room;
    this.player.roomIndex++;
    this.canGetLoot = true;
    this.isBossBattle = false;
    this.trapDamage = 0;
    this.manageRoom();
  }

  async openChest() {
    await this.audio.playEffect('chest');
    this.getLootEquip();
    this.canGetLoot = this.player.inventory.filter(t => t == 0).length > 0;
    this.chestOpened = true;
    this.canChestReward = true;
    this.eventDone = true;
    this.player.gold += ~~this.chestGold;
  }

  async getRewardChest() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: this.translate.instant('in-game.dungeon.loading'),
    });
    loading.present();
    try {
      await AdMob.prepareRewardVideoAd(this.options);
      await AdMob.showRewardVideoAd().then((value: any) => {
        if (value) {
          this.player.gold += ~~this.chestGold;
          this.chestGold *= 2;
          this.canChestReward = false;
        }
        loading.dismiss();
      });
    } catch (error) {
      let toast = await this.toastCtrl.create({
        message: this.translate.instant('ads.fail'),
        position: 'top',
        duration: 1500,
      });
      await toast.present();
      loading.dismiss();
    }
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
        thisEquip = this.modifyEquip(thisEquip);
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
    await this.audio.stopAllMusic();
    await this.audio.playMusic('cave');
    await this.helper.sleep(300);
    let alert = await this.alertCtrl.create({
      backdropDismiss: false,
      keyboardClose: false,
      header: this.translate.instant('in-game.dungeon.game-over.alert.header'),
      message: this.translate.instant('in-game.dungeon.game-over.alert.message'),
      buttons: [
        {
          text: this.translate.instant('in-game.dungeon.game-over.alert.continue'),
          cssClass: 'sell-item',
          handler: async () => {
            let loading = await this.loadingCtrl.create({
              spinner: 'circular',
              message: this.translate.instant('in-game.dungeon.loading'),
            });
            loading.present();
            await AdMob.prepareRewardVideoAd(this.options);
            await AdMob.showRewardVideoAd().then((value: any) => {
              if (value) {
                let baseLife = this.player.baseLife, baseMana = this.player.baseMana;
                this.player.currentLife = Math.round(baseLife / 2);
                if (this.player.currentLife >= this.player.baseLife) {
                  this.player.currentLife = this.player.baseLife;
                }
                this.player.currentMana += Math.round(baseMana / 4);
                if (this.player.currentMana >= this.player.baseMana) {
                  this.player.currentMana = this.player.baseMana;
                }
                this.canRevive = false;
                loading.dismiss();
                return true;
              }
            }, (err) => {
              loading.dismiss();
            });
          },
        },
        {
          text: this.translate.instant('in-game.dungeon.game-over.alert.leave'),
          role: 'cancel',
          cssClass: 'confirm-quit',
          handler: async () => {
            this.playerIsDead = true;
            this.eventDone = false;
            this.player.inBattle = false;
            let toolbars = document.getElementsByTagName('ion-toolbar')
            for (let i = 0; i < toolbars.length; i++) {
              toolbars[i].style.opacity = '0';
            }
            await this.audio.playEffect('gameOver');
            await this.storage.set('saveGame', false);
            return false;
          },
        },
      ],
    });
    if (this.canRevive) {
      await alert.present();
    } else {
      this.playerIsDead = true;
      this.eventDone = false;
      this.player.inBattle = false;
      let toolbars = document.getElementsByTagName('ion-toolbar')
      for (let i = 0; i < toolbars.length; i++) {
        toolbars[i].style.opacity = '0';
      }
      await this.storage.set('saveGame', false);
      return false;
    }
  }

  async battleAction(skill) {
    let playerVel = ~~(this.player.current.vel + this.player.equipAttr.vel), mnsAtk;
    this.canGetLoot = this.player.inventory.filter(t => t == 0).length > 0;
    this.canAtk = false;
    if (playerVel >= this.currentMonster.vel) {
      await this.playerAtk(skill);
      if (this.currentMonster.currentLife == 0) {
        if (this.isBossBattle) {
          await this.audio.stopAllMusic();
          await this.audio.playMusic('cave');
        }
        this.eventDone = true;
        this.player.inBattle = false;
        let canLvlUp = this.player.updateExp(this.currentMonster.exp);
        if (canLvlUp) {
          await this.audio.playEffect('lvlup');
        }
        this.player.gold += ~~this.currentMonster.gold;
        if (this.canGetLoot) {
          this.getLootEquip();
        }
        this.player.killCount++;
      } else {
        await this.helper.sleep(500);
        mnsAtk = await this.monsterAtk();
        await this.helper.sleep(100);
      }
    } else {
      await this.helper.sleep(100);
      mnsAtk = await this.monsterAtk();
      if (mnsAtk) {
        await this.helper.sleep(500);
        await this.playerAtk(skill);
        if (this.currentMonster.currentLife == 0) {
          if (this.isBossBattle) {
            await this.audio.stopAllMusic();
            await this.audio.playMusic('cave');
          }
          this.eventDone = true;
          this.player.inBattle = false;
          let canLvlUp = this.player.updateExp(this.currentMonster.exp);
          if (canLvlUp) {
            await this.audio.playEffect('lvlup');
          }
          this.player.gold += ~~this.currentMonster.gold;
          if (this.canGetLoot) {
            this.getLootEquip();
          }
          this.player.killCount++;
        }
      }
    }
    this.canAtk = true;
    if (mnsAtk) {
      this.changeConditionPlayer();
    }
  }

  private async monsterAtk() {
    let magicAtk = false, damage = 0, canHit = false;
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
    if (evasion <= (this.player.current.eva >= 40 ? 40 : this.player.current.eva)) {
      this.animateBattleColor = 'text-bless-heal';
      this.animateBattleText = this.translate.instant('battle.dodge');
      await this.audio.playEffect('evasion');
      await this.animateBattle().play();
    } else {
      canHit = true;
      this.player.currentLife -= damage;
      if (this.player.currentLife <= 0) {
        this.player.currentLife = 0;
      }
      this.animateBattleColor = magicAtk ? 'text-curse-burn' : 'text-bless-atk';
      this.animateBattleText = this.translate.instant('battle.enemy-atk', {
        val: damage, type: magicAtk ? this.translate.instant('battle.magic') : ''
      });
      await this.audio.playEffect(this.currentMonster.sound || 'monsterhit');
      await this.animateBattle().play();
    }

    if (this.player.currentLife <= 0) {
      this.player.currentLife = 0;
      await this.helper.sleep(150);
      this.deathCause = this.currentMonster.name;
      return this.gameOver();
    }

    return true;
  }

  private async playerAtk(sk) {
    let damage = 0, auxCurHP = 0, critChance = ~~(Math.random() * 100) + 1, critDamage = false,
      calcDamageResult = 0, canHit = false;
    switch (sk.type) {
      case 'atk':
        canHit = true;
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 1.75) + sk.val
        this.animateBattleColor = 'text-bless-atk';
        if (critChance <= (this.player.current.crit >= 60 ? 60 : this.player.current.crit)) {
          critDamage = true;
          this.animateBattleColor = 'text-color-equip';
          damage = ~~(damage * 1.5);
        }
        calcDamageResult = this.calcDamage(damage, this.currentMonster.def);
        auxCurHP = this.currentMonster.currentLife - calcDamageResult;
        this.animateBattleText = this.translate.instant('battle.your-atk', {
          val: calcDamageResult, mgc: '',
          type: critDamage ? this.translate.instant('battle.crit') : ''
        });
        break;
      case 'magic':
        canHit = true;
        damage = ~~((this.player.current[sk.attr] + this.player.equipAttr[sk.attr]) / 1.75) + sk.val;
        this.animateBattleColor = 'text-curse-burn';
        if (critChance <= (this.player.current.crit >= 60 ? 60 : this.player.current.crit)) {
          critDamage = true;
          this.animateBattleColor = 'text-color-equip';
          damage = ~~(damage * 1.5);
        }
        calcDamageResult = this.calcDamage(damage, this.currentMonster.prot);
        auxCurHP = this.currentMonster.currentLife - calcDamageResult;
        this.animateBattleText = this.translate.instant('battle.your-atk', {
          val: calcDamageResult, mgc: this.translate.instant('battle.magic'),
          type: critDamage ? this.translate.instant('battle.crit') : ''
        });
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
        this.animateBattleText = this.translate.instant('battle.bless', { attr: sk.attr, val: sk.val });
        await this.audio.playEffect(sk.sound || 'hit');
        break;
      case 'heal':
        let healLife = ~~(this.player.baseLife * (sk.val / 100));
        this.animateBattleColor = 'text-bless-heal';
        this.animateBattleText = this.translate.instant('battle.heal', { val: healLife });
        this.player.currentLife += healLife;
        if (this.player.currentLife >= this.player.baseLife) {
          this.player.currentLife = this.player.baseLife;
        }
        await this.audio.playEffect(sk.sound || 'hit');
        break;
    }
    this.player.currentMana -= sk.cost;
    if (damage > 0) {
      this.currentMonster.currentLife = auxCurHP <= 0 ? 0 : ~~auxCurHP;
    }
    if (canHit) {
      await this.audio.playEffect(sk.sound || 'hit');
    }
    await this.animateBattle().play();
  }

  private calcDamage(launcherAtk, targetDef) {
    let damage = ~~(launcherAtk - targetDef);
    return damage < 18 ? ~~(Math.random() * 18) + 5 : damage;
  }

  private async manageRoom() {
    let room = this.currentRoom;
    this.changeConditionPlayer();
    switch (room.action) {
      case 'empty':
        this.eventDone = true;
        break;
      case 'chest':
        this.chestGold = ~~((Math.floor(Math.random() * 15) + 6) * this.player.level);
        break;
      case 'battle':
      case 'boss':
        let actualFloor = (this.currentFloorIndex + 1);
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
          sound: null,
        };
        if ((actualFloor % 10 == 0) && room.action == 'boss') {
          let bsIndx = 0;
          if (actualFloor >= 50 && actualFloor <= 80) {
            bsIndx = 1;
          }
          if (actualFloor >= 90) {
            bsIndx = 2;
          }
          await this.audio.stopAllMusic();
          await this.audio.playMusic('finalBoss');
          this.isBossBattle = true;
          let finalBoss = FINAL_BOSS[bsIndx];
          this.currentMonster = this.finalBossMonster(finalBoss);
          await this.animateFinalBoss();
        } else {
          if (room.action == 'boss') {
            this.isBossBattle = true;
            await this.audio.stopAllMusic();
            await this.audio.playMusic('boss');
          }
          this.currentMonster = this.calcMonster(room.actionItem, room.action);
        }
        this.canAtk = true;
        break;
      case 'trap':
        let percLife = this.trapDamage = ~~(this.player.baseLife * room.actionItem.value);
        let evasion = ~~(Math.random() * 100) + 1;
        if (evasion <= this.player.current.eva) {
          this.trapped = false;
          await this.audio.playEffect('evasion');
        }
        if (this.trapped) {
          await this.audio.playEffect(room.actionItem.sound);
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
        this.actionItemTurn = room.actionItem.turns != 0 ? Math.ceil(Math.random() * 4) : 0;
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
              ? this.player.currentLife += ~~(room.actionItem.calc * this.player.baseLife)
              : this.player.currentLife -= ~~(room.actionItem.calc * this.player.baseLife);
            if (this.player.currentLife >= this.player.baseLife) {
              this.player.currentLife = this.player.baseLife;
            }
            break;
          case 'mana':
            room.actionItem.operator == '+'
              ? this.player.currentMana += ~~(room.actionItem.calc * this.player.baseMana)
              : this.player.currentMana -= ~~(room.actionItem.calc * this.player.baseMana);
            if (this.player.currentMana >= this.player.baseMana) {
              this.player.currentMana = this.player.baseMana;
            }
            break;
          case 'atk':
            if (room.actionItem.operator == '+') {
              this.player.current.atk = this.player.base.atk
                + ~~(room.actionItem.calc * this.player.base.atk);
              this.player.current.magic = this.player.base.magic
                + ~~(room.actionItem.calc * this.player.base.magic);
            } else {
              this.player.current.atk = this.player.base.atk
                - ~~(room.actionItem.calc * this.player.base.atk);
              this.player.current.magic = this.player.base.magic
                - ~~(room.actionItem.calc * this.player.base.magic);
            }
            break;
          case 'def':
            if (room.actionItem.operator == '+') {
              this.player.current.def = this.player.base.def
                + ~~(room.actionItem.calc * this.player.base.def);
              this.player.current.prot = this.player.base.prot
                + ~~(room.actionItem.calc * this.player.base.prot);
            } else {
              this.player.current.def = this.player.base.def
                - ~~(room.actionItem.calc * this.player.base.def);
              this.player.current.prot = this.player.base.prot
                - ~~(room.actionItem.calc * this.player.base.prot);
            }
            break;
          default:
            room.actionItem.operator == '+'
              ? this.player.current[room.actionItem.attr] = this.player.base[room.actionItem.attr] +
              ~~(room.actionItem.calc * this.player.base[room.actionItem.attr])
              : this.player.current[room.actionItem.attr] = this.player.base[room.actionItem.attr] -
              ~~(room.actionItem.calc * this.player.base[room.actionItem.attr]);
            break;
        }
        await this.audio.playEffect(room.actionItem.sound);
        this.eventDone = true;
        break;
    }

    await this.storage.set('saveGame', JSON.stringify({
      player: this.player,
      room: room,
      currentFloorIndex: this.currentFloorIndex,
    }));
  }

  private finalBossMonster(m) {
    let monster = Object.assign({}, m), lvAux = this.player.level;
    monster.level = lvAux <= 0 ? 1 : lvAux;
    monster.baseLife = ~~((m.baseLife + (m.baseLife * (monster.level / 3.2))) + (78.5 * monster.level));
    monster.currentLife = ~~monster.baseLife;
    monster.exp = ~~(m.exp * (monster.level / 2) + m.exp) + ~~(18.5 * this.player.level);
    monster.gold = ~~(m.gold * (monster.level / 2) + m.gold);
    monster.atk = ~~((m.atk + (monster.level * 11)) + (7.15 * monster.level));
    monster.def = ~~((m.def + (monster.level * 8)) + (1.5 * monster.level));
    monster.magic = ~~((m.magic + (monster.level * 7.5)) + (6.35 * monster.level));
    monster.prot = ~~(m.prot + (monster.level / 0.04));
    monster.vel = ~~(m.vel + (monster.level / 0.05));
    monster.sound = m.sound;
    return monster;
  }

  private calcMonster(m, type) {
    let monster = Object.assign({}, m), lvAux = type == 'boss'
      ? this.player.level : ~~((Math.random() * this.currentFloorIndex) + (this.player.level / 3));
    monster.level = lvAux <= 0 ? 1 : (lvAux > this.player.level ? this.player.level : lvAux);
    monster.baseLife = ~~((m.baseLife + (m.baseLife * (monster.level / 2))) + (27.5 * monster.level))
      + (type == 'boss' ? ~~(12 * monster.level) : 0);
    monster.currentLife = ~~monster.baseLife;
    monster.exp = ~~(m.exp * (monster.level / 2) + m.exp) + ~~(17 * this.player.level);
    monster.gold = ~~(m.gold * (monster.level / 5) + m.gold);
    monster.atk = ~~((m.atk + (monster.level * 7)) + (4.25 * monster.level));
    monster.def = ~~((m.def + (monster.level * 2)) + (1.5 * monster.level));
    monster.magic = ~~((m.magic + (monster.level * 4.5)) + (6 * monster.level));
    monster.prot = ~~(m.prot + (monster.level / 0.09));
    monster.vel = ~~(m.vel + (monster.level / 0.07));
    monster.sound = m.sound;
    return monster;
  }

  private changeConditionPlayer() {
    this.player.conditions = this.player.conditions.map(cnd => {
      cnd.turns -= 1;
      switch (cnd.attr) {
        case 'life':
          cnd.operator == '+'
            ? this.player.currentLife += ~~(cnd.calc * this.player.baseLife)
            : this.player.currentLife -= ~~(cnd.calc * this.player.baseLife);

          if (this.player.currentLife <= 0) {
            this.player.currentLife = 0;
            this.deathCause = cnd.title;
            return this.gameOver();
          }
          break;
        case 'atk':
          if (cnd.operator == '+') {
            this.player.current.atk = this.player.base.atk + ~~(cnd.calc * this.player.base.atk);
            this.player.current.magic = this.player.base.magic + ~~(cnd.calc * this.player.base.magic);
          } else {
            this.player.current.atk = this.player.base.atk - ~~(cnd.calc * this.player.base.atk);
            this.player.current.magic = this.player.base.magic - ~~(cnd.calc * this.player.base.magic);
          }
          break;
        case 'def':
          if (cnd.operator == '+') {
            this.player.current.def = this.player.base.def + ~~(cnd.calc * this.player.base.def);
            this.player.current.prot = this.player.base.prot + ~~(cnd.calc * this.player.base.prot);
          } else {
            this.player.current.def = this.player.base.def - ~~(cnd.calc * this.player.base.def);
            this.player.current.prot = this.player.base.prot - ~~(cnd.calc * this.player.base.prot);
          }
          break;
        default:
          cnd.operator == '+'
            ? this.player.current[cnd.attr] = this.player.base[cnd.attr]
            + ~~(cnd.calc * this.player.base[cnd.attr])
            : this.player.current[cnd.attr] = this.player.base[cnd.attr]
            - ~~(cnd.calc * this.player.base[cnd.attr]);
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

  async animateFinalBoss() {
    let actualFloor = (this.currentFloorIndex + 1);
    let speak = BOSS_SPEAK.find(t => t.floor == actualFloor);
    let message = speak ? this.translate.instant(speak.message)
      : this.translate.instant('final-boss.100.speak');
    let alert = await this.alertCtrl.create({
      message: `<em>"${message}"</em>`,
    });
    await alert.present();
  }

  async playButtonEffect() {
    await this.audio.playEffect('button');
  }
}
