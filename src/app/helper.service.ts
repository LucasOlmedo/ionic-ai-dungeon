import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
