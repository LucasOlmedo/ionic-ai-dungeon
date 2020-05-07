import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  charName: string = '';

  points: number = 5;

  vitality: number = 3;
  intelligence: number = 3;
  agility: number = 3;

  nameItems = [
    'Niamh', 'Jenkins', 'Nicholas', 'Theodore', 'Bailey', 'Leporis',
    'Aquila', 'Galexia', 'Cassio', 'Juliet', 'Perseus', 'Sagan',
    'Galileo', 'Leonis', 'Sirius', 'Pavonis', 'Arneb', 'Fenrir',
    'Phoebe', 'Casey', 'Joshua', 'Nguyen', 'Heather', 'Jamie',
    'Helmund', 'Ewin', 'Eathelm', 'Nanarv', 'Marget', 'Argen', 'Mosbi',
  ];

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public toastCtrl: ToastController
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
    if (this.charName == '' || this.points > 0) {
      this.presentToast();
    } else {
      this.presentLoading();
    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Crie seu personagem antes de começar a jornada!',
      position: 'top',
      duration: 1500,
    });
    await toast.present();
  }

  async presentLoading() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Carregando...',
      duration: 2000,
    });
    await loading.present();
    loading.onDidDismiss()
      .then(() => this.navCtrl.navigateRoot('/first-room'));
  }
}
