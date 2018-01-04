import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users;
  constructor() { }

  ngOnInit() {
    this.users = ['Some User'];
    for (let i = 0; i < 10; i++) {
      this.users.push(this.users[0]);
    }
  }

}
