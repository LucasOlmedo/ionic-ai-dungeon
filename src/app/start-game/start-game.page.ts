import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.page.html',
  styleUrls: ['./start-game.page.scss'],
})
export class StartGamePage implements OnInit {

  loreAnimation1: Animation;
  loreAnimation2: Animation;
  loreAnimation3: Animation;
  continueAnimation: Animation;
  animationDuration: number = 2500;

  private storage: Storage = new Storage({ name: '_ionicstorage' });

  constructor(private animationCtrl: AnimationController) {
    this.storage.set('dismiss-lore', true);
  }

  ngOnInit() {
    this.loreAnimation1 = this.createLoreAnimation1();
    this.loreAnimation2 = this.createLoreAnimation2();
    this.loreAnimation3 = this.createLoreAnimation3();
    this.continueAnimation = this.createContinueAnimation();
    this.playAnimations();
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
    await this.loreAnimation1.play();
    await this.loreAnimation2.play();
    await this.loreAnimation3.play();
    await this.continueAnimation.play();
  }

}
