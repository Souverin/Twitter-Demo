import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brief-user-info',
  templateUrl: './brief-user-info.component.html',
  styleUrls: ['./brief-user-info.component.css']
})
export class BriefUserInfoComponent implements OnInit {
  // @Input() username = JSON.parse(localStorage.getItem('user-login'));
  userEmail;
  userFirstName;
  userLastName;
  constructor() { }

  ngOnInit() {
    this.userFirstName = JSON.parse(localStorage.getItem('loggedUserFirstName'));
    this.userLastName = JSON.parse(localStorage.getItem('loggedUserLastName'));
    this.userEmail = JSON.parse(localStorage. getItem('loggedUserEmail'));
  }

}
