import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AudioService } from '../audio.service';
import { ConfigService } from '../config.service';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';
import { Storage } from '@ionic/storage';

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

  private storage: Storage = new Storage({ name: '_ionicstorage' });

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private playerService: PlayerService,
    public translate: TranslateService,
    private config: ConfigService,
    private audio: AudioService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initLang();
    this.loadPreviousGame();
  }

  async initLang() {
    await this.config.getLanguage()
      .subscribe(val => {
        this.lang = this.config.parseLang(val);
        this.translate.use(this.lang);
      });
  }

  async loadPreviousGame() {
    await this.storage.get('saveGame').then(async v => {
      if (v) {
        let save = JSON.parse(v), alert = await this.alertCtrl.create({
          header: this.translate.instant('new-char.save'),
          buttons: [
            {
              text: this.translate.instant('no'),
              role: 'cancel',
              cssClass: 'confirm-quit',
              handler: async () => {
                await this.audio.playEffect('button');
              },
            },
            {
              text: this.translate.instant('yes'),
              handler: async () => {
                await this.castSavePlayer(save.player);
                await this.audio.playEffect('click');
                await this.navCtrl.navigateRoot('/main-game');
              },
            }
          ],
        });
        await alert.present();
      }
    });
  }

  async randomName() {
    await this.audio.playEffect('button');
    this.charName = this.nameItems[Math.floor(Math.random() * this.nameItems.length)];
  }

  async increase(attr) {
    await this.audio.playEffect('button');
    if (this.points > 0) {
      this[`${attr}`]++;
      this.points--;
    }
  }

  async decrease(attr) {
    await this.audio.playEffect('button');
    let actual = this[`${attr}`];
    if (this.points < 6 && actual > 0) {
      this[`${attr}`]--;
      this.points++;
    }
  }

  async saveCharStartGame() {
    if (this.charName == '' || this.points > 0) {
      this.audio.playEffect('error');
      this.presentToast();
    } else {
      await this.storage.set('saveGame', false);
      this.createPlayer();
      this.audio.playEffect('click');
      this.navCtrl.navigateRoot('/main-game');
    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: this.translate.instant('new-char.fail'),
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

  private async castSavePlayer(p) {
    let player = new Player;
    player.name = p.name;
    player.level = p.level;
    player.exp = p.exp;
    player.expPercent = p.expPercent;
    player.nextLvl = p.nextLvl;
    player.currentNextLvl = p.currentNextLvl;
    player.points = p.points;
    player.vitality = p.vitality;
    player.intelligence = p.intelligence;
    player.agility = p.agility;
    player.gold = p.gold;
    player.floorIndex = p.floorIndex;
    player.roomIndex = p.roomIndex;
    player.killCount = p.killCount;
    player.inBattle = p.inBattle;
    player.inventory = p.inventory;
    player.currentLife = p.currentLife;
    player.baseLife = p.baseLife;
    player.currentMana = p.currentMana;
    player.baseMana = p.baseMana;
    player.base = p.base;
    player.current = p.current;
    player.equipAttr = p.equipAttr;
    player.skills = p.skills;
    player.equip = p.equip;
    player.conditions = p.conditions;
    this.playerService.setPlayer(player);
  }
}
