import { Component, OnInit } from '@angular/core';
import {LogoutService} from '../services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
  }
  onLogout () {
    this.logoutService.logout();
  }
}
