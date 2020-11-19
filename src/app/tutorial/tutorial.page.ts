import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  lang: any;

  constructor(
    public translate: TranslateService,
    private config: ConfigService,
    private audio: AudioService,
  ) { }

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

}
