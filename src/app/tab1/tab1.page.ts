import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  number: number = 0;
  interval;
  uri: string = '';
  jsonResponse: string = '';
  constructor(private alertController: AlertController, private fetchService: FetchService) {}

  async startFetch() {
    // this.jsonResponse = JSON.stringify(await this.fetchService.get());
    // console.log(this.jsonResponse);
    // this.presentAlert();

    if ('uri' in localStorage) {
      this.uri = localStorage.getItem('uri');
    } else {
      if (this.uri.trim() !== '') {
        localStorage.setItem('uri', this.uri);
        this.uri = localStorage.getItem('uri');
      } else {
        alert('madafa');
      }
    }
    if (this.uri.trim() !== '') {
      this.jsonResponse = await this.name(this.uri).then(data => data.text());
      this.interval = setInterval(async () => {
        this.jsonResponse = '';
        this.jsonResponse = await this.name(this.uri).then(data => data.text());
        this.number += 1;
      }, 6000);
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'JSONResult',
      message: this.jsonResponse.substring(0, 200),
      buttons: ['OK']
    });

    await alert.present();
  }
}
