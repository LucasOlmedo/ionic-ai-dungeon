import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';

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

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.initBuffs();
      });
  }

  initBuffs() {
    let playerEquipAttr = this.player.equipAttr, color = '';
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

}
