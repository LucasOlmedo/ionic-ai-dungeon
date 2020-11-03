import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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

  toggleShowIntro($event) {
    let checked = $event.detail.checked;
    this.showIntro = checked;
    this.config.setShowIntro(checked);
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
          handler: (data: String) => {
            this.selectedLanguage = data;
            this.config.setLanguage(data);
            this.translate.use(this.lang);
          }
        }
      ]
    });

    await alert.present();
  }
}
