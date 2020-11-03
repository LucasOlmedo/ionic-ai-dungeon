import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';

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
  ) {
    
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

  async startGame() {
    await this.storage.get('showIntro').then(val => {
      if (val) {
        this.navCtrl.navigateRoot('/start-game');
      } else {
        this.navCtrl.navigateRoot('/create-character');
      }
    });
  }
}
