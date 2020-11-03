import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.page.html',
  styleUrls: ['./shop-page.page.scss'],
})
export class ShopPagePage implements OnInit {

  lang: any;

  constructor(
    public translate: TranslateService,
    private config: ConfigService,
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
