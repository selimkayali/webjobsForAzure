import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private httpClient: HttpClient) {}

  async get(): Promise<string> {
    return await this.httpClient
      .get<Promise<string>>('uri if you want to use HttpClient')
      .toPromise();
  }
}
