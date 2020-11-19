import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
import { ConfigService } from '../config.service';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-main-game-char',
  templateUrl: './main-game-char.page.html',
  styleUrls: ['./main-game-char.page.scss'],
})
export class MainGameCharPage implements OnInit {

  lang: any;
  player: Player;

  constructor(
    private playerService: PlayerService,
    private config: ConfigService,
    private translate: TranslateService,
    private audio: AudioService,
  ) { }

  ngOnInit() {
    this.playerService.getPlayer()
      .subscribe((p: Player) => {
        this.player = p;
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

  async increase(attr) {
    if (this.player.points > 0) {
      this.player[`${attr}`]++;
      this.player.points--;
    }
    this.player.updateAttributes(attr);
    await this.audio.playEffect('button');
  }

}
