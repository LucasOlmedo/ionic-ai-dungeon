import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  charName: string;

  points: number = 5;

  vitality: number = 3;
  intelligence: number = 3;
  agility: number = 3;

  nameItems = [
    'Niamh', 'Jenkins', 'Nicholas', 'Theodore', 'Bailey', 'Leporis',
    'Aquila', 'Galexia', 'Cassio', 'Juliet', 'Perseus', 'Sagan',
    'Galileo', 'Leonis', 'Sirius', 'Pavonis', 'Arneb', 'Fenrir',
    'Phoebe', 'Casey', 'Joshua', 'Nguyen', 'Heather', 'Jamie',
    'Helmund', 'Ewin', 'Eathelm', 'Nanarv', 'Marget', 'Argen',
  ];

  constructor(
    public loadingCtrl: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  randomName() {
    this.charName = this.nameItems[Math.floor(Math.random() * this.nameItems.length)];
  }

  increase(attr) {
    if (this.points > 0) {
      this[`${attr}`]++;
      this.points--;
    }
  }

  decrease(attr) {
    let actual = this[`${attr}`];
    if (this.points < 5 && actual > 3) {
      this[`${attr}`]--;
      this.points++;
    }
  }

  saveCharStartGame() {
    this.presentLoading();
  }

  async presentLoading() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Carregando...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();
    loading.onDidDismiss()
      .then(() => this.router.navigateByUrl('/first-room'));
  }
}
