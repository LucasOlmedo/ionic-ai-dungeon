import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ConfigService } from './config.service';
import { Howl, Howler } from 'howler';

const { NativeAudio } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  effects: any;
  musics: any;
  selectedMusic: boolean;
  selectedEffects: boolean;
  currentMusic: string;

  constructor(
    private config: ConfigService,
  ) {
    this.loadAssets();
    console.log(this.currentMusic);
  }

  async loadAssets() {
    await this.loadMusic();
    await this.loadEffects();
    this.effects = {

      // UI
      click: new Howl({ src: ['assets/sounds/ui/click.wav'] }),
      switch: new Howl({ src: ['assets/sounds/ui/switch.wav'] }),
      button: new Howl({ src: ['assets/sounds/ui/button.wav'] }),
      error: new Howl({ src: ['assets/sounds/ui/error.ogg'] }),
      gameOver: new Howl({ src: ['assets/sounds/ui/gameOver.mp3'] }),

      // GAME
      drop: new Howl({ src: ['assets/sounds/game/drop.ogg'] }),
      coin: new Howl({ src: ['assets/sounds/game/coin.ogg'] }),
      bottle: new Howl({ src: ['assets/sounds/game/bottle.wav'] }),
      door: new Howl({ src: ['assets/sounds/game/door.ogg'] }),
      lvlup: new Howl({ src: ['assets/sounds/game/lvlup.ogg'] }),
      equip: new Howl({ src: ['assets/sounds/game/equip.ogg'] }),
      next: new Howl({ src: ['assets/sounds/game/next.wav'] }),
      chest: new Howl({ src: ['assets/sounds/game/chest.ogg'] }),
      evasion: new Howl({ src: ['assets/sounds/game/evasion.wav'] }),

      // CURSE
      curseVenon: new Howl({ src: ['assets/sounds/game/curseVenon.mp3'] }),
      curseBurn: new Howl({ src: ['assets/sounds/game/curseBurn.wav'] }),
      curseAtk: new Howl({ src: ['assets/sounds/game/curseAtk.ogg'] }),
      curseDef: new Howl({ src: ['assets/sounds/game/curseDef.wav'] }),
      curseVel: new Howl({ src: ['assets/sounds/game/curseVel.wav'] }),

      // BLESS
      blessHeal: new Howl({ src: ['assets/sounds/game/blessHeal.wav'] }),
      blessMana: new Howl({ src: ['assets/sounds/game/blessMana.wav'] }),
      blessAtk: new Howl({ src: ['assets/sounds/game/blessAtk.wav'] }),
      blessDef: new Howl({ src: ['assets/sounds/game/blessDef.wav'] }),
      blessVel: new Howl({ src: ['assets/sounds/game/blessVel.wav'] }),

      // TRAP
      trapWolf: new Howl({ src: ['assets/sounds/game/trapWolf.wav'] }),
      trapWine: new Howl({ src: ['assets/sounds/game/trapWine.wav'] }),
      trapEarth: new Howl({ src: ['assets/sounds/game/trapEarth.flac'] }),
      trapSpike: new Howl({ src: ['assets/sounds/game/trapSpike.ogg'] }),
      trapFire: new Howl({ src: ['assets/sounds/game/trapFire.ogg'] }),

      // SKILL HITS
      hit: new Howl({ src: ['assets/sounds/battle/skill/hit.wav'] }),
      shieldBash: new Howl({ src: ['assets/sounds/battle/skill/shieldBash.wav'] }),
      eggDefense: new Howl({ src: ['assets/sounds/battle/skill/eggDefense.wav'] }),
      emeraldShield: new Howl({ src: ['assets/sounds/battle/skill/emeraldShield.wav'] }),
      vibratingShield: new Howl({ src: ['assets/sounds/battle/skill/vibratingShield.wav'] }),
      healthCapsule: new Howl({ src: ['assets/sounds/battle/skill/healthCapsule.wav'] }),
      brokenHeart: new Howl({ src: ['assets/sounds/battle/skill/brokenHeart.wav'] }),
      pyromaniac: new Howl({ src: ['assets/sounds/battle/skill/pyromaniac.wav'] }),
      gems: new Howl({ src: ['assets/sounds/battle/skill/gems.wav'] }),
      shieldReflect: new Howl({ src: ['assets/sounds/battle/skill/shieldReflect.mp3'] }),
      focusPunch: new Howl({ src: ['assets/sounds/battle/skill/focusPunch.flac'] }),
      archBow: new Howl({ src: ['assets/sounds/battle/skill/archBow.ogg'] }),
      axeAtk: new Howl({ src: ['assets/sounds/battle/skill/axeAtk.wav'] }),
      bo: new Howl({ src: ['assets/sounds/battle/skill/bo.flac'] }),
      musicSpell: new Howl({ src: ['assets/sounds/battle/skill/musicSpell.ogg'] }),
      musicalNotes: new Howl({ src: ['assets/sounds/battle/skill/musicalNotes.ogg'] }),
      arrowDunk: new Howl({ src: ['assets/sounds/battle/skill/arrowDunk.wav'] }),
      quickSlash: new Howl({ src: ['assets/sounds/battle/skill/quickSlash.ogg'] }),
      flail: new Howl({ src: ['assets/sounds/battle/skill/flail.flac'] }),
      crossSlash: new Howl({ src: ['assets/sounds/battle/skill/crossSlash.wav'] }),
      greatAxeAtk: new Howl({ src: ['assets/sounds/battle/skill/greatAxeAtk.flac'] }),
      heavyArrow: new Howl({ src: ['assets/sounds/battle/skill/heavyArrow.wav'] }),
      stoneAxeAtk: new Howl({ src: ['assets/sounds/battle/skill/stoneAxeAtk.wav'] }),
      cupid: new Howl({ src: ['assets/sounds/battle/skill/cupid.wav'] }),
      hammer: new Howl({ src: ['assets/sounds/battle/skill/hammer.wav'] }),
      spinBlade: new Howl({ src: ['assets/sounds/battle/skill/spinBlade.wav'] }),
      throwKunai: new Howl({ src: ['assets/sounds/battle/skill/throwKunai.wav'] }),
      sunSpear: new Howl({ src: ['assets/sounds/battle/skill/sunSpear.wav'] }),
      magicArrow: new Howl({ src: ['assets/sounds/battle/skill/magicArrow.wav'] }),
      sparkles: new Howl({ src: ['assets/sounds/battle/skill/sparkles.wav'] }),
      warPick: new Howl({ src: ['assets/sounds/battle/skill/warPick.wav'] }),
      resonance: new Howl({ src: ['assets/sounds/battle/skill/resonance.wav'] }),
      saberSlash: new Howl({ src: ['assets/sounds/battle/skill/saberSlash.wav'] }),
      swordSlash: new Howl({ src: ['assets/sounds/battle/skill/swordSlash.wav'] }),
      throwSpear: new Howl({ src: ['assets/sounds/battle/skill/throwSpear.wav'] }),
      spearHook: new Howl({ src: ['assets/sounds/battle/skill/spearHook.wav'] }),
      basicSwordAtk: new Howl({ src: ['assets/sounds/battle/skill/basicSwordAtk.wav'] }),
      shuriken: new Howl({ src: ['assets/sounds/battle/skill/shuriken.wav'] }),
      maceHead: new Howl({ src: ['assets/sounds/battle/skill/maceHead.wav'] }),
      portal: new Howl({ src: ['assets/sounds/battle/skill/portal.wav'] }),
      icicles: new Howl({ src: ['assets/sounds/battle/skill/icicles.wav'] }),
      circleSpark: new Howl({ src: ['assets/sounds/battle/skill/circleSpark.wav'] }),
      echo: new Howl({ src: ['assets/sounds/battle/skill/echo.wav'] }),
      laserSpark: new Howl({ src: ['assets/sounds/battle/skill/laserSpark.wav'] }),
      splash: new Howl({ src: ['assets/sounds/battle/skill/splash.flac'] }),
      crystalBall: new Howl({ src: ['assets/sounds/battle/skill/crystalBall.wav'] }),
      orbAtk: new Howl({ src: ['assets/sounds/battle/skill/orbAtk.wav'] }),
      fairyWand: new Howl({ src: ['assets/sounds/battle/skill/fairyWand.wav'] }),
      trident: new Howl({ src: ['assets/sounds/battle/skill/trident.mp3'] }),
      magicTrident: new Howl({ src: ['assets/sounds/battle/skill/magicTrident.wav'] }),
      windHole: new Howl({ src: ['assets/sounds/battle/skill/windHole.wav'] }),
      zeus: new Howl({ src: ['assets/sounds/battle/skill/zeus.wav'] }),
      fireSpell: new Howl({ src: ['assets/sounds/battle/skill/fireSpell.wav'] }),
      iceSpell: new Howl({ src: ['assets/sounds/battle/skill/iceSpell.wav'] }),
      spellBook: new Howl({ src: ['assets/sounds/battle/skill/spellBook.wav'] }),
      impact: new Howl({ src: ['assets/sounds/battle/skill/impact.wav'] }),
      bookAura: new Howl({ src: ['assets/sounds/battle/skill/bookAura.wav'] }),
      burningBook: new Howl({ src: ['assets/sounds/battle/skill/burningBook.wav'] }),
      mineral: new Howl({ src: ['assets/sounds/battle/skill/mineral.wav'] }),
      snakeBite: new Howl({ src: ['assets/sounds/battle/skill/snakeBite.ogg'] }),
      stoneBall: new Howl({ src: ['assets/sounds/battle/skill/stoneBall.wav'] }),
      magicTrick: new Howl({ src: ['assets/sounds/battle/skill/magicTrick.wav'] }),
      crossMark: new Howl({ src: ['assets/sounds/battle/skill/crossMark.wav'] }),
      crystalShine: new Howl({ src: ['assets/sounds/battle/skill/crystalShine.wav'] }),
      fireRing: new Howl({ src: ['assets/sounds/battle/skill/fireRing.wav'] }),
      circleGold: new Howl({ src: ['assets/sounds/battle/skill/circleGold.wav'] }),
      ionBlast: new Howl({ src: ['assets/sounds/battle/skill/ionBlast.wav'] }),
      heartWings: new Howl({ src: ['assets/sounds/battle/skill/heartWings.wav'] }),
      ghostFire: new Howl({ src: ['assets/sounds/battle/skill/ghostFire.wav'] }),
      eletricOrb: new Howl({ src: ['assets/sounds/battle/skill/eletricOrb.wav'] }),
      fang: new Howl({ src: ['assets/sounds/battle/skill/fang.wav'] }),
      wall: new Howl({ src: ['assets/sounds/battle/skill/wall.mp3'] }),
      spikeAtk: new Howl({ src: ['assets/sounds/battle/skill/spikeAtk.wav'] }),
      plasmaBolt: new Howl({ src: ['assets/sounds/battle/skill/plasmaBolt.wav'] }),
      beam: new Howl({ src: ['assets/sounds/battle/skill/beam.wav'] }),
      buff: new Howl({ src: ['assets/sounds/battle/skill/buff.wav'] }),
      shiningHeart: new Howl({ src: ['assets/sounds/battle/skill/shiningHeart.mp3'] }),
      waterBolt: new Howl({ src: ['assets/sounds/battle/skill/waterBolt.wav'] }),
      knockout: new Howl({ src: ['assets/sounds/battle/skill/knockout.wav'] }),
      healing: new Howl({ src: ['assets/sounds/battle/skill/healing.wav'] }),
      psychic: new Howl({ src: ['assets/sounds/battle/skill/psychic.wav'] }),
      energy: new Howl({ src: ['assets/sounds/battle/skill/energy.wav'] }),
      divert: new Howl({ src: ['assets/sounds/battle/skill/divert.wav'] }),
      shell: new Howl({ src: ['assets/sounds/battle/skill/shell.wav'] }),
      acrobatic: new Howl({ src: ['assets/sounds/battle/skill/acrobatic.wav'] }),
      halfHeart: new Howl({ src: ['assets/sounds/battle/skill/halfHeart.wav'] }),
      bubbles: new Howl({ src: ['assets/sounds/battle/skill/bubbles.wav'] }),
      dragonBreath: new Howl({ src: ['assets/sounds/battle/skill/dragonBreath.wav'] }),

      // MONSTER HITS
      monsterhit: new Howl({ src: ['assets/sounds/battle/monster/monsterhit.wav'] }),
      roar: new Howl({ src: ['assets/sounds/battle/monster/roar.wav'] }),
      howl: new Howl({ src: ['assets/sounds/battle/monster/howl.wav'] }),
      bleh: new Howl({ src: ['assets/sounds/battle/monster/bleh.wav'] }),
      arrgh: new Howl({ src: ['assets/sounds/battle/monster/arrgh.wav'] }),
      punch: new Howl({ src: ['assets/sounds/battle/monster/punch.wav'] }),
      misc: new Howl({ src: ['assets/sounds/battle/monster/misc.ogg'] }),
      goblin: new Howl({ src: ['assets/sounds/battle/monster/goblin.wav'] }),
      goblin2: new Howl({ src: ['assets/sounds/battle/monster/goblin2.wav'] }),
      slime: new Howl({ src: ['assets/sounds/battle/monster/slime.wav'] }),
      sword: new Howl({ src: ['assets/sounds/battle/monster/sword.wav'] }),
      growl: new Howl({ src: ['assets/sounds/battle/monster/growl.wav'] }),
      slap: new Howl({ src: ['assets/sounds/battle/monster/slap.ogg'] }),
      swish: new Howl({ src: ['assets/sounds/battle/monster/swish.wav'] }),
      spell: new Howl({ src: ['assets/sounds/battle/monster/spell.wav'] }),
      witch: new Howl({ src: ['assets/sounds/battle/monster/witch.wav'] }),
      crow: new Howl({ src: ['assets/sounds/battle/monster/crow.wav'] }),
      griff: new Howl({ src: ['assets/sounds/battle/monster/griff.wav'] }),
      burp: new Howl({ src: ['assets/sounds/battle/monster/burp.mp3'] }),
      reverb: new Howl({ src: ['assets/sounds/battle/monster/reverb.wav'] }),
      dragon: new Howl({ src: ['assets/sounds/battle/monster/dragon.wav'] }),
      groans: new Howl({ src: ['assets/sounds/battle/monster/groans.wav'] }),
      bear: new Howl({ src: ['assets/sounds/battle/monster/bear.wav'] }),
      garg: new Howl({ src: ['assets/sounds/battle/monster/garg.wav'] }),
      wave: new Howl({ src: ['assets/sounds/battle/monster/wave.wav'] }),
      laugh: new Howl({ src: ['assets/sounds/battle/monster/laugh.wav'] }),
      angel: new Howl({ src: ['assets/sounds/battle/monster/angel.ogg'] }),
      crack: new Howl({ src: ['assets/sounds/battle/monster/crack.wav'] }),
      leech: new Howl({ src: ['assets/sounds/battle/monster/leech.wav'] }),
      spell2: new Howl({ src: ['assets/sounds/battle/monster/spell2.wav'] }),
      glitch: new Howl({ src: ['assets/sounds/battle/monster/glitch.wav'] }),
      skull: new Howl({ src: ['assets/sounds/battle/monster/skull.wav'] }),
      groar: new Howl({ src: ['assets/sounds/battle/monster/groar.mp3'] }),
      transmat: new Howl({ src: ['assets/sounds/battle/monster/transmat.mp3'] }),
      shadow: new Howl({ src: ['assets/sounds/battle/monster/shadow.mp3'] }),
      lake: new Howl({ src: ['assets/sounds/battle/monster/lake.wav'] }),
      ping: new Howl({ src: ['assets/sounds/battle/monster/ping.wav'] }),
      dino: new Howl({ src: ['assets/sounds/battle/monster/dino.mp3'] }),
      sick: new Howl({ src: ['assets/sounds/battle/monster/sick.wav'] }),
      blast: new Howl({ src: ['assets/sounds/battle/monster/blast.wav'] }),
      break: new Howl({ src: ['assets/sounds/battle/monster/break.wav'] }),
    };

    this.musics = {

      // CAVE
      cave1: new Howl({ src: ['assets/sounds/music/cave-01.ogg'], loop: true, }),
      cave2: new Howl({ src: ['assets/sounds/music/cave-01.ogg'], loop: true, }),
      // cave2: new Howl({ src: ['assets/sounds/music/cave-02.mp3'], loop: true, }),
      boss: new Howl({ src: ['assets/sounds/music/boss.ogg'], loop: true, }),

    };
  }

  async loadMusic() {
    await this.config.getMusic()
      .subscribe(val => this.selectedMusic = val);
  }

  async loadEffects() {
    await this.config.getEffects()
      .subscribe(val => this.selectedEffects = val);
  }

  async playEffect(ef: string) {
    if (this.selectedEffects) {
      await this.effects[ef].play();
    }
  }

  async playMusic(ms: string) {
    if (this.selectedMusic) {
      this.currentMusic = ms;
      await this.musics[ms].play();
    }
  }

  async stopMusic(ms: string) {
    if (!this.selectedMusic) {
      this.currentMusic = null;
      await this.musics[ms].pause();
    }
  }

  async stopCurrentMusic() {
    if (!this.selectedMusic) {
      await this.musics[this.currentMusic].pause();
    }
  }

  async playCurrentMusic() {
    if (this.selectedMusic) {
      await this.musics[this.currentMusic].play();
    }
  }

  async fadeInMusic(ms: string) {
    await this.musics[ms].play();
    await this.musics[ms].fade(0, 1, 1000);
  }

  async fadeOutMusic(ms: string) {
    await this.musics[ms].fade(1, 0, 1000);
    await this.musics[ms].pause();
  }
}
