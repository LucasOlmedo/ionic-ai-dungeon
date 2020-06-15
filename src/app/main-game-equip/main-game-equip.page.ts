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

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
      });
  }

}
