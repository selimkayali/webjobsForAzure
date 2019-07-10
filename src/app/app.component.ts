import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) //private backgroundMode: BackgroundMode,
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.addEventListener(
        'deviceready',
        function() {
          console.log('madafa');
          // cordova.plugins.backgroundMode is now available
          cordova.plugins.backgroundMode.setDefaults({
            bigText: true,
            resume: true,
            ticker: 'its working :)',
            text: 'Azure webjobs',
            title: 'webjobs'
          });
          cordova.plugins.backgroundMode.enable();
          cordova.plugins.backgroundMode.disableBatteryOptimizations();
        },
        false
      );
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
