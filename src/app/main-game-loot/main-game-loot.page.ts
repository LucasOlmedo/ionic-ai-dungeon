import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-main-game-loot',
  templateUrl: './main-game-loot.page.html',
  styleUrls: ['./main-game-loot.page.scss'],
})
export class MainGameLootPage implements OnInit {

  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
      });
  }

}
