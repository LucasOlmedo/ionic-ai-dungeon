import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-game-settings',
  templateUrl: './main-game-settings.page.html',
  styleUrls: ['./main-game-settings.page.scss'],
})
export class MainGameSettingsPage implements OnInit {

  selectedMusic: boolean;
  selectedEffects: boolean;

  constructor(
    public config: ConfigService, 
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.loadMusic();
    this.loadEffects();
  }

  ngOnInit() {
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
      header: 'Sair da Dungeon?',
      message: 'O seu progresso não será salvo ao sair da dungeon.',
      buttons: [
        {
          text: 'Permanecer',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sair',
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
