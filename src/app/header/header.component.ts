import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onLogout () {
    localStorage.setItem('successfulLog', JSON.stringify(false));
    console.log('successful logout!');
  }
}
