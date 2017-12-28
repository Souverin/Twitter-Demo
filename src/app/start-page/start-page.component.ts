import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  registrationFormOn;
  loginFormOn;
  constructor() {this.registrationFormOn = true; this.loginFormOn = false; }

  ngOnInit() {
  }
}
