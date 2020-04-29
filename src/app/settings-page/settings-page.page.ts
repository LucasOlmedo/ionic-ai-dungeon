import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  selectedLanguage: string = 'Português';

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async changeLanguage() {
    const alert = await this.alertCtrl.create({
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
          handler: data => {
            this.selectedLanguage = data;
          }
        }
      ]
    });

    await alert.present();
  }
}
