import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  randomId() {
    let id = Math.random();
    return id.toString(36).substr(2, 9);
  }
}
