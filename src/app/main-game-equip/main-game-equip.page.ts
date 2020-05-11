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
  life: number;
  atk: number;
  def: number;
  magic: number;
  mana: number;
  prot: number;
  vel: number;
  crit: number;
  eva: number;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.life = this.player.getLife();
        this.atk = this.player.getAtk();
        this.def = this.player.getDef();
        this.magic = this.player.getMagic();
        this.mana = this.player.getMana();
        this.prot = this.player.getProt();
        this.vel = this.player.getVel();
        this.crit = this.player.getCrit();
        this.eva = this.player.getEva();
      });
  }

}
