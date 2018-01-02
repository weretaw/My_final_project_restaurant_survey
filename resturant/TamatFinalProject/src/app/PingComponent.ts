// src/app/ping/ping.component.ts

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

// ...
export class PingComponent {

  API_URL: string = 'http://http://localhost:65023/api';
  message: string;

  constructor(public authHttp: AuthHttp) {}

  public securedPing(): void {
    this.message = '';
    this.authHttp.get(`${this.API_URL}/private`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }
}