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
      case 'bottle':
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

    if (equip.skill != null) {
      let skillValue = '';
      switch (equip.skill.type) {
        case 'atk':
          skillValue = `${equip.skill.val} de Dano Físico`;
          break;
        case 'magic':
          skillValue = `${equip.skill.val} de Dano Mágico`;
          break;
        case 'buff':
          skillValue = `+ ${equip.skill.val}% ${this.nameRef[equip.skill.attr]} por 4 Turnos`;
          break;
        case 'heal':
          skillValue = `Cura ${equip.skill.val}% da Vida Máxima`;
          break;
        default:
          skillValue = '';
          break;
      }
      attribText += `<br><br>
        <ion-label>
          <small>
            Habilidade: ${equip.skill.name}<br>
            Custo: ${equip.skill.cost} de Mana<br>
            ${skillValue}
          </small>
        </ion-label>`;
    }

    let alert = await this.alertCtrl.create({
      header: `${equip.equiped == true ? 'Desequipar' : 'Equipar'} item?`,
      message: `${messageText}<br><br>${attribText}<br><br>Vale ${equip.cost} moedas`,
      buttons: [
        equip.equiped == true ? `` : {
          text: `Vender`,
          cssClass: 'sell-item',
          handler: () => {
            this.player.gold += equip.cost;
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == equip.id) {
                return 0;
              }
              return t;
            });
          },
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
    let slotAttr = '', messageText = '';
    if (potion.attr == 'life') {
      slotAttr = 'HP';
      messageText = `${potion.name}<br>Recupera ${potion.value}% de ${slotAttr}<br><br><br>
        Vale ${potion.cost} moedas`;
    }
    if (potion.attr == 'mana') {
      slotAttr = 'Mana';
      messageText = `${potion.name}<br>Recupera ${potion.value}% de ${slotAttr}<br><br><br>
        Vale ${potion.cost} moedas`;
    }
    if (potion.attr == 'exp') {
      slotAttr = 'EXP';
      messageText = `${potion.name}<br>Adiciona ${potion.value} de ${slotAttr}<br><br><br>
        Vale ${potion.cost} moedas`;
    }

    let alert = await this.alertCtrl.create({
      header: 'Usar item?',
      message: messageText,
      buttons: [
        {
          text: 'Vender',
          cssClass: 'sell-item',
          handler: () => {
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
          },
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
            if (potion.attr == 'exp') {
              this.player.updateExp(potion.value);
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

  async reorderLoot() {
    this.player.inventory.sort().reverse();
  }

}
