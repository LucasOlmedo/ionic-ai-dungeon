import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private player: BehaviorSubject<Player> = new BehaviorSubject(new Player);

  constructor() { }

  public setPlayer(p) {
    this.player.next(p);
  }

  public getPlayer() {
    return this.player.asObservable();
  }
}
