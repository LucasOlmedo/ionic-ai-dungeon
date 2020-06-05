import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private act = ['battle', 'quest', 'trap', 'empty', 'treasure', 'boss', 'bless', 'curse'];
  private startRoom = [
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

  constructor() { }

  generateDungeon() {
    return new Promise(resolve => {
      resolve(this.createDungeonRecursive(30, 2));
    });
  }

  private createDungeonRecursive(depth: number, min: number, id: string = '', next: boolean = false) {
    let rooms = [], iterator = next == false ? 1 : Math.ceil(Math.random() * min);
    if (depth < 1) {
      return rooms;
    }

    for (let i = 1; i <= (iterator == 0 ? 1 : iterator); i++) {
      let type = next ? (depth - 1 < 1 ? 'last' : 'node') : 'root',
        action = next ? (type == 'last' ? 'boss' : this.act[~~(Math.random() * this.act.length)]) : 'start',
        roomItem = {
          id: `${id + i.toString()}`,
          type: type,
          action: action,
          img: '../assets/images/prision.jpg',
          location: 'Unknown Location',
          title: 'Stage Room',
          description: 'Lorem ipsum dolor sit',
          next: this.createDungeonRecursive(depth - 1, min, `${id + i}|`, true),
        };
      rooms.push(this.verifyRoom(roomItem));
    }
    return rooms;
  }

  private verifyRoom(room) {
    if (room.action == 'start') {
      let random = this.startRoom[Math.floor(Math.random() * this.startRoom.length)];
      room.img = random.img;
      room.title = random.title;
      room.location = random.location;
      room.description = random.description;
    }
    return room;
  }
}
