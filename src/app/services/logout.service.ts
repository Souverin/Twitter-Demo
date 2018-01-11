import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  constructor() { }
  logout() {
    localStorage.setItem('successfulLog', JSON.stringify(false));
    localStorage.clear();
    console.log('successful logout!');
  }
}
