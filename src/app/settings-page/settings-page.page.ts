import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  lang: any;
  selectedLanguage: String = '';
  selectedMusic: boolean;
  selectedEffects: boolean;
  showIntro: boolean;

  constructor(
    public alertCtrl: AlertController,
    public config: ConfigService,
    public translate: TranslateService,
    private audio: AudioService,
  ) {
    this.translate.setDefaultLang('en');
    this.loadLanguage();
    this.loadMusic();
    this.loadEffects();
    this.loadIntro();
  }

  ngOnInit() {
  }

  async loadLanguage() {
    await this.config.getLanguage()
      .subscribe(val => {
        this.selectedLanguage = val;
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

  async loadIntro() {
    await this.config.getShowIntro()
      .subscribe(val => this.showIntro = val);
  }

  async toggleMusic($event) {
    let checked = $event.detail.checked;
    this.selectedMusic = checked;
    await this.config.setMusic(checked);
    if (this.selectedMusic == true) {
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

  async toggleShowIntro($event) {
    let checked = $event.detail.checked;
    this.showIntro = checked;
    this.config.setShowIntro(checked);
    await this.playSwitch();
  }

  async changeLanguage() {
    let alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Português',
          value: 'Português',
          checked: this.selectedLanguage === 'Português',
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'English',
          value: 'English',
          checked: this.selectedLanguage === 'English',
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Español',
          value: 'Español',
          checked: this.selectedLanguage === 'Español',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.selectedLanguage = this.selectedLanguage;
          }
        },
        {
          text: 'Ok',
          handler: async (data: String) => {
            this.selectedLanguage = data;
            this.config.setLanguage(data);
            this.translate.use(this.lang);
            await this.playSwitch();
          }
        }
      ]
    });

    await alert.present();
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

  async showInfo() {
    await this.playButton();
    let alert = await this.alertCtrl.create({
      message: `<small><strong>${this.translate.instant('settings.icon')}:</strong> <br> 
      - https://game-icons.net/</small><br>

      <small><strong>${this.translate.instant('settings.effects')}:</strong> <br> 
      - https://opengameart.org/</small><br>

      <small><strong>${this.translate.instant('settings.music')}:</strong> <br> 
      - https://opengameart.org/</small><br>

      <small><strong>${this.translate.instant('settings.img')}:</strong> <br> 
      - https://www.kindpng.com/ <br> 
      - https://www.pngwing.com/ <br>
      - https://www.pngegg.com/ <br>
      - https://www.pngitem.com/ <br>
      - https://favpng.com/</small>`,
    });
    await alert.present();
  }
}
