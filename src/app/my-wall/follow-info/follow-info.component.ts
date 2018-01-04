import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-info',
  templateUrl: './follow-info.component.html',
  styleUrls: ['./follow-info.component.css']
})
export class FollowInfoComponent implements OnInit {
  followers = [ ];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.followers.push('Followers');
    }
  }

}
