import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

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

  constructor(private animationCtrl: AnimationController) { }

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
      .duration(4000)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createLoreAnimation2() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#lore-text-2'))
      .duration(4000)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createLoreAnimation3() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#lore-text-3'))
      .duration(4000)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  createContinueAnimation() {
    return this.animationCtrl.create()
      .addElement(document.querySelector('#btn-continue'))
      .duration(1000)
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
