import {Component, OnDestroy, OnInit} from '@angular/core';
import {FollowService} from '../../services/follow.service';
import { FollowedComponent } from './followed/followed.component';

@Component({
  selector: 'app-follow-info',
  templateUrl: './follow-info.component.html',
  styleUrls: ['./follow-info.component.css']
})
export class FollowInfoComponent implements OnInit, OnDestroy {
  constructor(protected followService: FollowService) {  }
  followedSubscription;
  ngOnInit() {
    const userKey = JSON.parse(localStorage.getItem('loggedUserKey'));
    this.followedSubscription = this.followService.getFollowedList()
      .subscribe( followed => {
        this.followService.renderFollowedArrayByKey(followed, userKey);
      });
  }
  ngOnDestroy() {
    this.followedSubscription.unsubscribe();
    if (this.followService.userSubscription) {
      this.followService.userSubscription.unsubscribe();
    }
  }
}
