import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-first-room',
  templateUrl: './first-room.page.html',
  styleUrls: ['./first-room.page.scss'],
})
export class FirstRoomPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToMainRoom() {
    this.navCtrl.navigateRoot('/main-game');
  }
}
