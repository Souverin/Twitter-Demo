import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../services/follow.service';
import { FollowedComponent } from './followed/followed.component';

@Component({
  selector: 'app-follow-info',
  templateUrl: './follow-info.component.html',
  styleUrls: ['./follow-info.component.css']
})
export class FollowInfoComponent implements OnInit {
  constructor(protected followService: FollowService) {  }

  ngOnInit() {
    const userKey = JSON.parse(localStorage.getItem('loggedUserKey'));
    this.followService.getFollowedList()
      .subscribe( followed => {
        this.followService.renderFollowedArrayByKey(followed, userKey);
      });
  }
}
