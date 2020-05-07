import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-main-game-settings',
  templateUrl: './main-game-settings.page.html',
  styleUrls: ['./main-game-settings.page.scss'],
})
export class MainGameSettingsPage implements OnInit {

  selectedMusic: boolean;
  selectedEffects: boolean;
  selectedFontSize: number;

  constructor(public config: ConfigService) {
    this.loadMusic();
    this.loadEffects();
    this.loadFontSize();
  }

  ngOnInit() {
  }

  async loadMusic() {
    await this.config.getMusic()
      .subscribe(val => this.selectedMusic = val);
  }

  async loadEffects() {
    await this.config.getEffects()
      .subscribe(val => this.selectedEffects = val);
  }

  async loadFontSize() {
    await this.config.getFontSize()
      .subscribe(val => this.selectedFontSize = val);
  }

  toggleMusic($event) {
    let checked = $event.detail.checked;
    this.selectedMusic = checked;
    this.config.setMusic(checked);
  }

  toggleEffects($event) {
    let checked = $event.detail.checked;
    this.selectedEffects = checked;
    this.config.setEffects(checked);
  }

  changeFontSize($event) {
    let value = $event.detail.value;
    this.selectedFontSize = value;
    this.config.setFontSize(value);
  }

}
