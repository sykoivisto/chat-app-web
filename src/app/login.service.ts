import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private username = environment.username;

  constructor() { }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
