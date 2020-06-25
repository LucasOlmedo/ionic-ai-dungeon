import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main-game-loot',
  templateUrl: './main-game-loot.page.html',
  styleUrls: ['./main-game-loot.page.scss'],
})
export class MainGameLootPage implements OnInit {

  player: Player;
  count: number = 0;
  nameRef = {
    life: 'HP',
    atk: 'Ataque',
    def: 'Defesa',
    mana: 'Mana',
    magic: 'Magia',
    prot: 'Proteção',
    vel: 'Velocidade',
    crit: 'Crítico',
    eva: 'Evasão',
  };

  constructor(
    private playerService: PlayerService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.updateCount();
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
        await this.handlePotion(slot);
        break;
      default:
        break;
    }
  }

  private async handleEquip(equip) {
    let equipExtra = equip.extra, messageText = `${equip.name}`,
      attribText = equipExtra.map(t => `+ ${t.value} ${t.attr == 'crit' || t.attr == 'eva' ? '%' : ''} 
      ${this.nameRef[t.attr]}`).join('<br>');
    let alert = await this.alertCtrl.create({
      header: `${equip.equiped == true ? 'Desequipar' : 'Equipar'} item?`,
      message: equip.equiped == true ? '' : `${messageText}<br><br>${attribText}`,
      buttons: [
        {
          text: 'Vender',
          cssClass: 'sell-item',
          handler: () => { },
        },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'confirm-quit',
        },
        {
          text: 'Sim',
          handler: () => {
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
            } else {
              let tAtrbLife = target.extra.find(x => x.attr == 'life'),
                tAtrbMana = target.extra.find(x => x.attr == 'mana');

              this.player.equip[source.equip] = null;
              this.player.calcEquipAttr();

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
          }
        },
      ],
    });

    await alert.present();
  }

  private verifyEquip(equip) {
    let match = this.player.equip[equip.equip];
    return match;
  }

  private async handlePotion(potion) {
    let slotAttr = potion.attr == 'life' ? 'HP' : 'Mana';
    let alert = await this.alertCtrl.create({
      header: 'Usar item?',
      message: `${potion.name}<br>Recupera ${potion.value}% de ${slotAttr}`,
      buttons: [
        {
          text: 'Vender',
          cssClass: 'sell-item',
          handler: () => { },
        },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'confirm-quit',
        },
        {
          text: 'Sim',
          cssClass: 'success-confirm',
          handler: () => {
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
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == potion.id) {
                if (t.count <= 0 || potion.count <= 0) {
                  potion = 0;
                }
                return potion;
              }
              return t;
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
