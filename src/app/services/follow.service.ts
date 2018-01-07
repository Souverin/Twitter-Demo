import { Injectable } from '@angular/core';

@Injectable()
export class FollowService {
  followed;
  constructor() { }
  follow () {
    this.followed = true;
  }
  unfollow () {
    this.followed = false;
  }
}
