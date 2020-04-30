import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  charName: string;

  points: number = 5;

  vitality: number = 3;
  intelligence: number = 3;
  agility: number = 3;

  nameItems = [
    'Niamh', 'Jenkins', 'Nicholas', 'Theodore', 'Bailey', 'Leporis',
    'Aquila', 'Galexia', 'Cassio', 'Juliet', 'Perseus', 'Sagan',
    'Galileo', 'Leonis', 'Sirius', 'Pavonis', 'Arneb', 'Fenrir',
    'Phoebe', 'Casey', 'Joshua', 'Nguyen', 'Heather', 'Jamie',
    'Helmund', 'Ewin', 'Eathelm', 'Nanarv', 'Marget', 'Argen',
  ];

  constructor() { }

  ngOnInit() {
  }

  randomName() {
    this.charName = this.nameItems[Math.floor(Math.random() * this.nameItems.length)];
  }

  changeVitality(number) {
    this.vitality = this.checkMinimum(this.vitality, number);
  }

  changeIntelligence(number) {
    this.intelligence = this.checkMinimum(this.intelligence, number);
  }

  changeAgility(number) {
    this.agility = this.checkMinimum(this.agility, number);
  }

  checkMinimum(current, number) {
    return current + number;
    // let sum = 0, act = this.points;
    // this.points = act <= 0 ? (number == 1 ? 0 : 1) :
    //   (act == 5 && number == -1) ? 5 : act - number;

    // sum = this.points <= 0 ? current : current + number;
    // return current < 3 || sum < 3 ? 3 : sum;
  }
}
