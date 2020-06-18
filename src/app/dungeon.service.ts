import { Injectable } from '@angular/core';
import { START_ROOM, CURSE_TYPES, BLESS_TYPES, TRAPS } from './dungeon-constants';
import { MONSTERS, BOSSES } from './bestiary-constants';

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private act = [
    'battle', 'battle', 'battle',
    'battle', 'battle', 'battle',
    'battle', 'battle', 'battle',
    'trap',
    'empty',
    'chest',
    'bless', 'bless',
    'curse', 'curse',
  ];

  constructor() { }

  generateDungeon() {
    return new Promise(resolve => {
      resolve(this.createDungeonRecursive(25, 2));
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
          location: 'Baú da sorte',
          description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
          loot: (playerLv) => (Math.floor(Math.random() * 60) + 15) * playerLv,
        };
        room.actionItem = chest;
        break;
      case 'trap':
        let trap = TRAPS[Math.floor(Math.random() * TRAPS.length)];
        room.actionItem = trap;
        break;
      case 'battle':
        let m = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
        room.actionItem = m;
        break;
      case 'boss':
        let b = BOSSES[Math.floor(Math.random() * BOSSES.length)];
        room.actionItem = b;
        break;
      default:
        break;
    }
    return room;
  }
}
