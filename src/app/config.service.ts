import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private storage: Storage = new Storage({ name: '_ionicstorage' });
  private language: BehaviorSubject<any> = new BehaviorSubject(null);
  private music: BehaviorSubject<any> = new BehaviorSubject(null);
  private effects: BehaviorSubject<any> = new BehaviorSubject(null);
  private showIntro: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.initConfig();
  }

  async initConfig() {
    await this.storage.get('lang').then(val => {
      this.setLanguage(val != null ? val : 'English');
    });
    await this.storage.get('music').then(val => {
      this.setMusic(val != null ? val : true);
    });
    await this.storage.get('effects').then(val => {
      this.setEffects(val != null ? val : true);
    });
    await this.storage.get('showIntro').then(val => {
      this.setShowIntro(val != null ? val : true);
    });
  }

  parseLang(lang) {
    switch (lang) {
      case 'Português':
        return 'pt';
      case 'English':
        return 'en';
      case 'Español':
        return 'es';
      default:
        return 'en';
    }
  }

  setLanguage(lang: String) {
    this.storage.set('lang', lang)
      .then(val => this.language.next(val));
  }

  getLanguage() {
    return this.language.asObservable();
  }

  setMusic(flag: boolean) {
    this.storage.set('music', flag)
      .then(val => this.music.next(val));
  }

  getMusic() {
    return this.music.asObservable();
  }

  setEffects(flag: boolean) {
    this.storage.set('effects', flag)
      .then(val => this.effects.next(val));
  }

  getEffects() {
    return this.effects.asObservable();
  }

  setShowIntro(flag: boolean) {
    this.storage.set('showIntro', flag)
      .then(val => this.showIntro.next(val));
  }

  getShowIntro() {
    return this.showIntro.asObservable();
  }
}
