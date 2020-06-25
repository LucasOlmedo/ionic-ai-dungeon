import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main-game-equip',
  templateUrl: './main-game-equip.page.html',
  styleUrls: ['./main-game-equip.page.scss'],
})
export class MainGameEquipPage implements OnInit {

  player: Player;
  buffs = [];
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
        this.updateBuffs();
      });
  }

  updateBuffs() {
    let playerEquipAttr = this.player.equipAttr, color = '';
    this.buffs = [];
    for (let buff in playerEquipAttr) {
      switch (buff) {
        case 'life':
        case 'atk':
        case 'def':
          color = 'danger';
          break;
        case 'mana':
        case 'magic':
        case 'prot':
          color = 'primary';
          break;
        case 'vel':
        case 'crit':
        case 'eva':
          color = 'success';
          break;
      }
      this.buffs.push({
        name: this.nameRef[buff],
        value: playerEquipAttr[buff],
        cond: (buff == 'crit' || buff == 'eva') ? '%' : '',
        color: color,
      });
    }
  }

  async removeEquip(equip) {
    let messageText = `${equip.name}`, attribText = equip.extra
      .map(t => `+ ${t.value} ${t.attr == 'crit' || t.attr == 'eva' ? '%' : ''} ${this.nameRef[t.attr]}`)
      .join('<br>');
    let alert = await this.alertCtrl.create({
      header: 'Desequipar item?',
      message: `${messageText}<br><br>${attribText}`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'confirm-quit',
        },
        {
          text: 'Sim',
          handler: () => {
            let tAtrbLife = equip.extra.find(x => x.attr == 'life'),
              tAtrbMana = equip.extra.find(x => x.attr == 'mana');

            this.player.equip[equip.equip] = null;
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

            equip.equiped = false;
            this.player.inventory = this.player.inventory.map((t: any) => {
              if (t.id == equip.id) {
                return equip;
              }
              return t;
            });
            this.updateBuffs();
          },
        },
      ],
    });
    await alert.present();
  }
}
