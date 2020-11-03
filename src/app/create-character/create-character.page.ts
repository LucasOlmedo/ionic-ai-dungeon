import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config.service';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {

  lang: any;
  charName: string = '';
  points: number = 6;
  vitality: number = 0;
  intelligence: number = 0;
  agility: number = 0;
  nameItems = [
    'Niamh', 'Jenkins', 'Nicholas', 'Theodore', 'Bailey', 'Leporis',
    'Aquila', 'Galexia', 'Cassio', 'Juliet', 'Perseus', 'Sagan',
    'Galileo', 'Leonis', 'Sirius', 'Pavonis', 'Arneb', 'Fenrir',
    'Phoebe', 'Casey', 'Joshua', 'Nguyen', 'Heather', 'Jamie',
    'Helmund', 'Ewin', 'Eathelm', 'Nanarv', 'Marget', 'Argen', 'Mosbi',
  ];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private playerService: PlayerService,
    public translate: TranslateService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initLang();
  }

  async initLang() {
    await this.config.getLanguage()
      .subscribe(val => {
        this.lang = this.config.parseLang(val);
        this.translate.use(this.lang);
      });
  }

  randomName() {
    this.charName = this.nameItems[Math.floor(Math.random() * this.nameItems.length)];
  }

  increase(attr) {
    if (this.points > 0) {
      this[`${attr}`]++;
      this.points--;
    }
  }

  decrease(attr) {
    let actual = this[`${attr}`];
    if (this.points < 6 && actual > 0) {
      this[`${attr}`]--;
      this.points++;
    }
  }

  saveCharStartGame() {
    if (this.charName == '' || this.points > 0) {
      this.presentToast();
    } else {
      this.createPlayer();
      this.navCtrl.navigateRoot('/main-game');
    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Crie seu personagem antes de começar a jornada!',
      position: 'top',
      duration: 1500,
    });
    await toast.present();
  }

  private createPlayer() {
    let player = new Player;
    player.name = this.charName;
    player.vitality = this.vitality;
    player.intelligence = this.intelligence;
    player.agility = this.agility;
    player.calcEquipAttr();
    player.initCurrent();
    player.initEquipAttr();
    player.calcLevel();
    this.playerService.setPlayer(player);
  }
}
