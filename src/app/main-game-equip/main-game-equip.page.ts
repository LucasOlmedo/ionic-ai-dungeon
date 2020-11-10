import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-main-game-equip',
  templateUrl: './main-game-equip.page.html',
  styleUrls: ['./main-game-equip.page.scss'],
})
export class MainGameEquipPage implements OnInit {

  lang: any;
  player: Player;
  buffs = [];

  constructor(
    private playerService: PlayerService,
    private alertCtrl: AlertController,
    private config: ConfigService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.updateBuffs();
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
        name: this.translate.instant(`player.attr.${buff}`),
        value: playerEquipAttr[buff],
        cond: (buff == 'crit' || buff == 'eva') ? '%' : '',
        color: color,
      });
    }
  }

  async removeEquip(equip) {
    let messageText = `${this.translate.instant(equip.name)}`, attribText = equip.extra
      .map(t => `+ ${t.value} ${t.attr == 'crit'
        || t.attr == 'eva' ? '%' : ''} ${this.translate.instant('player.attr.' + t.attr)}`)
      .join('<br>');
    let alert = await this.alertCtrl.create({
      header: this.player.inBattle == false
        ? this.translate.instant('main-game.equip.unequip') :
        this.translate.instant('main-game.equip.details'),
      message: `${messageText}<br><br>${attribText}`,
      buttons: this.player.inBattle == false ? [
        {
          text: this.translate.instant('no'),
          role: 'cancel',
          cssClass: 'confirm-quit',
        },
        {
          text: this.translate.instant('yes'),
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

            this.player.removeEquipSkill(equip);
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
      ] : [],
    });
    await alert.present();
  }

  async showSkill(skill) {
    let skillValue = '';
    switch (skill.type) {
      case 'atk':
        skillValue = this.translate.instant('item.term.atk-damage', { val: skill.val });
        break;
      case 'magic':
        skillValue = this.translate.instant('item.term.mgc-damage', { val: skill.val });
        break;
      case 'buff':
        skillValue = this.translate
          .instant('item.term.buff', {
            val: skill.val,
            attr: this.translate.instant('player.attr.' + skill.attr)
          });
        break;
      case 'heal':
        skillValue = this.translate.instant('item.term.heal', { val: skill.val });
        break;
      default:
        skillValue = '';
        break;
    }
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(skill.name),
      message: `<ion-label>
            ${this.translate.instant('item.term.cost', { val: skill.cost})}<br>
            ${skillValue}<br><br>
            <em>"${this.translate.instant(skill.desc) || ''}"</em>
        </ion-label>`,
    });
    await alert.present();
  }
}
