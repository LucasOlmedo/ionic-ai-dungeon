import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.page.html',
  styleUrls: ['./main-game.page.scss'],
})
export class MainGamePage implements OnInit {

  player: Player;
  exp: number = 0;
  nextLvl: number = 0;
  expPercent: number = 0;
  life: number = 0;
  baseLife: number = 0;
  lPercent: number = 0.0;
  mana: number = 0;
  baseMana: number = 0;
  mPercent: number = 0.0;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
        this.life = this.baseLife = this.player.getLife();
        this.mana = this.baseMana = this.player.getMana();
        this.exp = this.player.exp;
        this.nextLvl = this.player.nextLvl;
        this.setPercentage();
      });
  }

  setPercentage() {
    this.lPercent = this.life / this.baseLife;
    this.mPercent = this.mana / this.baseMana;
    this.expPercent = this.exp / this.nextLvl;
  }

}
