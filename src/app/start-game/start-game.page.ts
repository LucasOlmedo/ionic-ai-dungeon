import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.page.html',
  styleUrls: ['./start-game.page.scss'],
})
export class StartGamePage implements OnInit {

  lang: any;
  loreAnimation1: Animation;
  loreAnimation2: Animation;
  loreAnimation3: Animation;
  continueAnimation: Animation;
  animationDuration: number = 2500;

  constructor(
    private animationCtrl: AnimationController,
    public translate: TranslateService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.loreAnimation1 = this.createLoreAnimation1();
    this.loreAnimation2 = this.createLoreAnimation2();
    this.loreAnimation3 = this.createLoreAnimation3();
    this.continueAnimation = this.createContinueAnimation();
    this.playAnimations();
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

  createLoreAnimation1() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#lore-text-1'))
      .duration(this.animationDuration)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createLoreAnimation2() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#lore-text-2'))
      .duration(this.animationDuration)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createLoreAnimation3() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#lore-text-3'))
      .duration(this.animationDuration)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createContinueAnimation() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#btn-continue'))
      .duration(500)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  async playAnimations() {
    let btnCntn = <HTMLInputElement>document.getElementById('btn-continue');
    btnCntn.disabled = true;
    await this.loreAnimation1.play();
    await this.loreAnimation2.play();
    await this.loreAnimation3.play();
    await this.continueAnimation.play();
    btnCntn.disabled = false;
  }

}
