import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-first-room',
  templateUrl: './first-room.page.html',
  styleUrls: ['./first-room.page.scss'],
})
export class FirstRoomPage implements OnInit {

  startRoom = {};
  private roomList = [
    {
      img: '../assets/images/room.jpg',
      location: 'Quarto desconhecido',
      title: 'Madison, WI',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
      img: '../assets/images/cave.jpg',
      location: 'Caverna misteriosa',
      title: 'Nibirus, WI',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
      img: '../assets/images/woods.jpg',
      location: 'Clareira na floresta',
      title: 'Valencia, WI',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
      img: '../assets/images/prision.jpg',
      location: 'Prisão abandonada',
      title: 'Krashina, WI',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
      img: '../assets/images/tavern.jpg',
      location: 'Taverna de Swabiuz',
      title: 'Swabiuz, WI',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
  ];

  constructor(public navCtrl: NavController) {
    this.startRoom = this.roomList[Math.floor(Math.random() * this.roomList.length)];
  }

  ngOnInit() {
  }

  goToMainRoom() {
    this.navCtrl.navigateRoot('/main-game');
  }
}
