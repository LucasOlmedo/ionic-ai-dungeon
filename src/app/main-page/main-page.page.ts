import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  private storage: Storage = new Storage({ name: '_ionicstorage' });

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  startGame() {
    this.storage.get('dismiss-lore').then(val => {
      if (val) {
        this.navCtrl.navigateRoot('/create-character');
      } else {
        this.navCtrl.navigateRoot('/start-game');
      }
    });
  }

}
