import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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

  toggleMusic($event) {
    let checked = $event.detail.checked;
    this.selectedMusic = checked;
    this.config.setMusic(checked);
  }

  toggleEffects($event) {
    let checked = $event.detail.checked;
    this.selectedEffects = checked;
    this.config.setEffects(checked);
  }

  quitDungeon() {
    this.quitDungeonConfirm();
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
        }, {
          text: this.translate.instant('main-game.settings.exit'),
          cssClass: 'confirm-quit',
          handler: () => {
            this.navCtrl.navigateRoot('/');
          }
        }
      ]
    });

    alert.present();
  }

}
