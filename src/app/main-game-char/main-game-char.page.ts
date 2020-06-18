import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-main-game-char',
  templateUrl: './main-game-char.page.html',
  styleUrls: ['./main-game-char.page.scss'],
})
export class MainGameCharPage implements OnInit {

  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
      });
  }

  increase(attr) {
    if (this.player.points > 0) {
      this.player[`${attr}`]++;
      this.player.points--;
    }
    this.player.updateAttributes(attr);
  }

}
