import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  selectedLanguage: String = '';
  selectedNotification: boolean;
  selectedMusic: boolean;
  selectedEffects: boolean;
  selectedFontSize: number;

  constructor(
    public alertCtrl: AlertController,
    public config: ConfigService
  ) {
    this.loadLanguage();
    this.loadNotification();
    this.loadMusic();
    this.loadEffects();
    this.loadFontSize();
  }

  ngOnInit() {
  }

  async loadNotification() {
    await this.config.getNotification()
      .subscribe(val => this.selectedNotification = val);
  }

  async loadLanguage() {
    await this.config.getLanguage()
      .subscribe(val => this.selectedLanguage = val);
  }

  async loadMusic() {
    await this.config.getMusic()
      .subscribe(val => this.selectedMusic = val);
  }

  async loadEffects() {
    await this.config.getEffects()
      .subscribe(val => this.selectedEffects = val);
  }

  async loadFontSize() {
    await this.config.getFontSize()
      .subscribe(val => this.selectedFontSize = val);
  }

  toggleNotification($event) {
    let checked = $event.detail.checked;
    this.selectedNotification = checked;
    this.config.setNotification(checked);
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

  changeFontSize($event) {
    let value = $event.detail.value;
    this.selectedFontSize = value;
    this.config.setFontSize(value);
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
          }
        }
      ]
    });

    await alert.present();
  }
}
