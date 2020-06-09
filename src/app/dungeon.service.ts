import { Injectable } from '@angular/core';
import { START_ROOM, CURSE_TYPES, BLESS_TYPES } from './dungeon-constants';

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private act = ['battle', 'quest', 'trap', 'empty', 'chest', 'bless', 'curse'];

  constructor() { }

  generateDungeon() {
    return new Promise(resolve => {
      resolve(this.createDungeonRecursive(20, 2));
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
          actionItem: {},
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
    switch (room.action) {
      case 'start':
      case 'empty':
        let start = START_ROOM[Math.floor(Math.random() * START_ROOM.length)];
        room.img = start.img;
        room.title = start.title;
        room.location = start.location;
        room.description = start.description;
        break;
      case 'curse':
        let curse = CURSE_TYPES[Math.floor(Math.random() * CURSE_TYPES.length)];
        room.actionItem = curse;
        break;
      case 'bless':
        let bless = BLESS_TYPES[Math.floor(Math.random() * BLESS_TYPES.length)];
        room.actionItem = bless;
        break;
      case 'chest':
        let chest = {
          location: 'Tesouro da sorte',
          description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
          loot: {
            name: 'Item X',
          },
        };
        room.actionItem = chest;
        break;
      default:
        break;
    }
    return room;
  }
}
