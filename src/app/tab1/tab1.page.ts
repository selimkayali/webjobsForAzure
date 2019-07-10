import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FetchService } from '../services/fetch.service';
//import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  number = 0;
  interval;
  uri = '';
  jsonResponse = '';
  constructor(
    private alertController: AlertController,
    private fetchService: FetchService,
    //private backgroundMode: BackgroundMode,
    private foregroundService: ForegroundService
  ) {}

  async startFetch() {
    // this.badge.requestPermission().then(res => {
    //   if (res) {

    //   }
    // });

    // this.jsonResponse = JSON.stringify(await this.fetchService.get());
    // console.log(this.jsonResponse);
    // this.presentAlert();

    if ('uri' in localStorage) {
      this.uri = localStorage.getItem('uri');
    } else {
      if (this.uri.trim() !== '') {
        localStorage.setItem('uri', this.uri);
        this.uri = localStorage.getItem('uri');
      }
    }
    if (this.uri.trim() !== '') {
      this.jsonResponse = await this.name(this.uri).then(data => data.text());
      this.interval = setInterval(async () => {
        this.jsonResponse = '';
        this.jsonResponse = await this.name(this.uri).then(data => data.text());
        const date = new Date();
        this.jsonResponse +=
          ' ' +
          date.getDay() +
          '.' +
          date.getMonth() +
          '.' +
          date.getFullYear() +
          '-' +
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds();
        this.number += 1;
        this.foregroundService.start('WebJobs Working - ' + this.number, this.jsonResponse);
      }, 90000);
    }
  }

  async name(uri) {
    return await fetch(uri);
  }

  stopFetch() {
    clearInterval(this.interval);
  }
  clearStorage() {
    localStorage.clear();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: message,
      message: this.jsonResponse.substring(0, 200),
      buttons: ['OK']
    });

    await alert.present();
  }
}
