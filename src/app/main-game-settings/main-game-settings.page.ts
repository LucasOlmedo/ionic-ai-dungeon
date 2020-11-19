import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-main-game-settings',
  templateUrl: './main-game-settings.page.html',
  styleUrls: ['./main-game-settings.page.scss'],
})
export class MainGameSettingsPage implements OnInit {

  lang: any;
  selectedMusic: boolean;
  selectedEffects: boolean;

  constructor(
    public config: ConfigService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private translate: TranslateService,
    private audio: AudioService,
  ) {
    this.loadMusic();
    this.loadEffects();
  }

  ngOnInit() {
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

  async loadMusic() {
    await this.config.getMusic()
      .subscribe(val => this.selectedMusic = val);
  }

  async loadEffects() {
    await this.config.getEffects()
      .subscribe(val => this.selectedEffects = val);
  }

  async toggleMusic($event) {
    let checked = $event.detail.checked;
    this.selectedMusic = checked;
    await this.config.setMusic(checked);
    if (this.selectedMusic) {
      await this.audio.playCurrentMusic();
    } else {
      await this.audio.stopCurrentMusic();
    }
    await this.playSwitch();
  }

  async toggleEffects($event) {
    let checked = $event.detail.checked;
    this.selectedEffects = checked;
    this.config.setEffects(checked);
    await this.playSwitch();
  }

  quitDungeon() {
    this.quitDungeonConfirm();
  }

  async playSwitch() {
    if (this.selectedEffects) {
      await this.audio.playEffect('switch');
    }
  }

  async playButton() {
    if (this.selectedEffects) {
      await this.audio.playEffect('button');
    }
  }

  async quitDungeonConfirm() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('main-game.settings.title'),
      message: this.translate.instant('main-game.settings.text'),
      buttons: [
        {
          text: this.translate.instant('main-game.settings.continue'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => this.audio.playEffect('button'),
        }, {
          text: this.translate.instant('main-game.settings.exit'),
          cssClass: 'confirm-quit',
          handler: () => {
            this.audio.playEffect('error');
            this.navCtrl.navigateRoot('/');
          }
        }
      ]
    });

    this.audio.playEffect('button');
    alert.present();
  }

}
