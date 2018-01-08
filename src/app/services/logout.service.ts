import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  constructor() { }
  logout() {
    localStorage.clear();
    localStorage.setItem('successfulLog', JSON.stringify(false));
    console.log('successful logout!');
  }
}
