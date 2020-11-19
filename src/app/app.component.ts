import { Plugins } from "@capacitor/core";
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AudioService } from './audio.service';

const { AdMob } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private audio: AudioService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      AdMob.initialize('ca-app-pub-4059005643306368~7168330424');
      this.platform.pause.subscribe(async () => await this.audio.stopCurrentMusic());
      this.platform.resume.subscribe(async () => await this.audio.playCurrentMusic());
    });
  }
}
