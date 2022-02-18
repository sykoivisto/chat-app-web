import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private username = ''

  constructor() { }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
