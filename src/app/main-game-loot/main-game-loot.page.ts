import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
import { AlertController } from '@ionic/angular';
import { ConfigService } from '../config.service';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-main-game-loot',
  templateUrl: './main-game-loot.page.html',
  styleUrls: ['./main-game-loot.page.scss'],
})
export class MainGameLootPage implements OnInit {

  lang: any;
  player: Player;
  count: number = 0;

  constructor(
    private playerService: PlayerService,
    private alertCtrl: AlertController,
    private config: ConfigService,
    private translate: TranslateService,
    private audio: AudioService,
  ) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.updateCount();
      });
  }

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

  updateCount() {
    let inv = this.player.inventory;
    this.count = inv.filter(t => t != 0).length;
  }

  async manageSlot(slot) {
    switch (slot.type) {
      case 'equip':
        await this.handleEquip(slot);
        break;
      case 'potion':
      case 'bottle':
        await this.handlePotion(slot);
        break;
      default:
        break;
    }
  }

  private async handleEquip(equip) {
    let equipExtra = equip.extra, messageText = `${this.translate.instant(equip.name)}`,
      attribText = equipExtra.map(t => `+ ${t.value} ${t.attr == 'crit' || t.attr == 'eva' ? '%' : ''} 
      ${this.translate.instant('player.attr.' + t.attr)}`).join('<br>');

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
          skillValue = this.translate
            .instant('item.term.buff', {
              val: equip.skill.val,
              attr: this.translate.instant('player.attr.' + equip.skill.attr)
            });
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

    let alert = await this.alertCtrl.create({
      header: equip.equiped == true
        ? this.translate.instant('main-game.equip.unequip')
        : this.translate.instant('main-game.equip.equip'),
      message: `${messageText}<br><br>${attribText}<br><br>
        ${this.translate.instant('main-game.loot.sell', { val: equip.cost })}`,
      buttons: [
        equip.equiped == true ? `` : {
          text: this.translate.instant('sell'),
          cssClass: 'sell-item',
          handler: async () => {
            this.audio.playEffect('coin');
            this.player.gold += equip.cost;
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == equip.id) {
                return 0;
              }
              return t;
            });
            this.updateCount();
          },
        },
        {
          text: this.translate.instant('no'),
          role: 'cancel',
          cssClass: 'confirm-quit',
          handler: async () => await this.audio.playEffect('button'),
        },
        {
          text: this.translate.instant('yes'),
          handler: () => {
            equip.equiped == true ? this.audio.playEffect('drop') : this.audio.playEffect('equip');
            let source = equip, target = this.verifyEquip(equip);
            if (source.equiped == false) {
              this.player.equip[equip.equip] = equip;
              if (target != null) {
                let tAtrbLife = target.extra.find(x => x.attr == 'life'),
                  tAtrbMana = target.extra.find(x => x.attr == 'mana');

                if (tAtrbLife != null) {
                  this.player.equipAttr.life -= tAtrbLife.value;
                }

                if (tAtrbMana != null) {
                  this.player.equipAttr.mana -= tAtrbMana.value;
                }

                target.equiped = false;
                this.player.inventory = this.player.inventory.map((t: any) => {
                  if (t.id == source.id) {
                    return source;
                  }
                  if (target != null && t.id == target.id) {
                    return target;
                  }
                  return t;
                });
              } else {
                let tAtrbLife = source.extra.find(x => x.attr == 'life'),
                  tAtrbMana = source.extra.find(x => x.attr == 'mana');

                if (tAtrbLife != null) {
                  this.player.baseLife += tAtrbLife.value;
                }

                if (tAtrbMana != null) {
                  this.player.baseMana += tAtrbMana.value;
                }
                this.player.calcEquipAttr();
              }

              if (source.skill != null) {
                let match = this.player.skills.find(t => {
                  if (t != null) {
                    return t.equip == source.skill.equip;
                  }
                });
                if (match) {
                  this.player.skills = this.player.skills.map(t => {
                    if (t != null && t.equip == source.skill.equip) {
                      return source.skill;
                    }
                    return t;
                  });
                } else {
                  let indexSk = this.player.skills.indexOf(null);
                  if (indexSk != -1) {
                    this.player.skills[indexSk] = source.skill;
                  }
                }
              }

            } else {
              let tAtrbLife = target.extra.find(x => x.attr == 'life'),
                tAtrbMana = target.extra.find(x => x.attr == 'mana');

              this.player.equip[source.equip] = null;
              this.player.calcEquipAttr();
              this.player.removeEquipSkill(source);

              if (tAtrbLife != null) {
                this.player.baseLife -= tAtrbLife.value;
                if (this.player.currentLife >= this.player.baseLife) {
                  this.player.currentLife = this.player.baseLife;
                }
              }

              if (tAtrbMana != null) {
                this.player.baseMana -= tAtrbMana.value;
                if (this.player.currentMana >= this.player.baseMana) {
                  this.player.currentMana = this.player.baseMana;
                }
              }
            }
            source.equiped = !source.equiped;
            this.player.calcEquipAttr();
            this.updateCount();
          }
        },
      ],
    });
    await this.audio.playEffect('button');
    await alert.present();
  }

  private verifyEquip(equip) {
    let match = this.player.equip[equip.equip];
    return match;
  }

  private async handlePotion(potion) {
    let slotAttr = '', messageText = `${this.translate.instant(potion.name)}<br>`;
    if (potion.attr == 'life') {
      slotAttr = 'HP';
      messageText += `${this.translate.instant('item.term.recover', { val: potion.value, attr: slotAttr })}<br><br>`;
    }
    if (potion.attr == 'mana') {
      slotAttr = 'Mana';
      messageText += `${this.translate.instant('item.term.recover', { val: potion.value, attr: slotAttr })}<br><br>`;
    }
    if (potion.attr == 'exp') {
      slotAttr += 'EXP';
      messageText = `${this.translate.instant('item.term.add', { val: potion.value, attr: slotAttr })}<br><br>`;
    }

    messageText += this.translate.instant('main-game.loot.sell', { val: potion.cost })

    let alert = await this.alertCtrl.create({
      header: this.translate.instant('main-game.loot.use'),
      message: messageText,
      buttons: [
        {
          text: this.translate.instant('sell'),
          cssClass: 'sell-item',
          handler: async () => {
            this.audio.playEffect('coin');
            potion.count--;
            this.player.gold += potion.cost;
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == potion.id) {
                if (t.count <= 0 || potion.count <= 0) {
                  potion = 0;
                }
                return potion;
              }
              return t;
            });
            this.updateCount();
          },
        },
        {
          text: this.translate.instant('no'),
          role: 'cancel',
          cssClass: 'confirm-quit',
          handler: async () => await this.audio.playEffect('button'),
        },
        {
          text: this.translate.instant('yes'),
          cssClass: 'success-confirm',
          handler: () => {
            this.audio.playEffect('bottle');
            potion.count--;
            if (potion.attr == 'life') {
              this.player.currentLife += ~~(this.player.baseLife * (potion.value / 100));
              if (this.player.currentLife >= this.player.baseLife) {
                this.player.currentLife = this.player.baseLife;
              }
            }
            if (potion.attr == 'mana') {
              this.player.currentMana += ~~(this.player.baseMana * (potion.value / 100));
              if (this.player.currentMana >= this.player.baseMana) {
                this.player.currentMana = this.player.baseMana;
              }
            }
            if (potion.attr == 'exp') {
              let canLvlUp = this.player.updateExp(potion.value);
              if (canLvlUp) {
                this.audio.playEffect('lvlup');
              }
            }
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == potion.id) {
                if (t.count <= 0 || potion.count <= 0) {
                  potion = 0;
                }
                return potion;
              }
              return t;
            });
            this.updateCount();
          }
        }
      ]
    });
    await this.audio.playEffect('button');
    await alert.present();
  }

  async reorderLoot() {
    await this.audio.playEffect('button');
    this.player.inventory.sort().reverse();
  }

}
