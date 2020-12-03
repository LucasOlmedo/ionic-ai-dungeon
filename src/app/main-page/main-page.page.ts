import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';
import { AudioService } from '../audio.service';

import { Plugins } from '@capacitor/core';
import { PlayGamesPlugin } from 'capacitor-play-games-services';
const playGames = Plugins.PlayGames as PlayGamesPlugin;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  lang: any;
  private storage: Storage = new Storage({ name: '_ionicstorage' });

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private config: ConfigService,
    private audio: AudioService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initLang();
    // this.loginPlayGames();
  }

  async loginPlayGames() {
    playGames.signStatus().then(async (response) => {
      if (!response.login) {
        try {
          await playGames.auth().then((response) => {
            console.log(response);
            /* response return:
                id: string;
                display_name: string;
                icon: string; // URI Does not work yet.
                title: string;
                login: boolean; TRUE if is online FALSE if is offline
            */
          });
        } catch (error) {
          let toast = await this.toastCtrl.create({
            message: this.translate.instant('main.auth-fail'),
            position: 'top',
            duration: 1500,
          });
          await toast.present();
        }
      }
    });
  }

  async initLang() {
    await this.config.getLanguage()
      .subscribe(async val => {
        this.lang = this.config.parseLang(val);
        this.translate.use(this.lang);
        this.config.getMusic().subscribe(async () => await this.audio.playMusic('cave'));
      });
  }

  async playClick() {
    await this.audio.playEffect('click');
  }

  async startGame() {
    this.playClick();
    await this.storage.get('seeTutorial').then(async val => {
      if (val) {
        await this.goStart();
      } else {
        let alert = await this.alertCtrl.create({
          header: this.translate.instant('tutorial.see'),
          buttons: [
            {
              text: this.translate.instant('no'),
              role: 'cancel',
              cssClass: 'confirm-quit',
              handler: async () => {
                await this.audio.playEffect('button');
                await this.goStart();
              },
            },
            {
              text: this.translate.instant('yes'),
              handler: async () => {
                await this.audio.playEffect('button');
                await this.storage.set('seeTutorial', true);
                this.navCtrl.navigateForward('/tutorial');
              },
            }
          ],
        });
        await alert.present();
      }
    });
  }

  async goStart() {
    await this.storage.get('showIntro').then(val => {
      if (val) {
        this.navCtrl.navigateRoot('/start-game');
      } else {
        this.navCtrl.navigateRoot('/create-character');
      }
    });
  }
}
