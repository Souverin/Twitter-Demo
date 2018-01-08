import {Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FollowService implements OnInit {
  followed;
  followList;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private database: AngularFireDatabase) { }
  ngOnInit () {
  }
  follow (params) {
    this.followed = true;
      console.log(params);
      this.userService.getUserByKey(params.id)
        .then(followedUser => {
          const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
          this.followList = this.database.list(`follows/${userId}/${followedUser.key}`)
          this.followList.push({firstName: followedUser.firstName, lastName: followedUser.lastName});
        })
        .catch( (error) => {
          console.log(error.code);
        });
  }
  unfollow (params) {
    this.followed = false;
    console.log(params);
    this.userService.getUserByKey(params.id)
      .then(followedUser => {
        const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
        this.followList = this.database.list(`follows/${userId}/${followedUser.key}`);
        console.log(this.followList);
        this.followList.remove();
      })
      .catch( (error) => {
        console.log(error.code);
      });
  }
  isFollowed (params) {
    this.userService.getUserByKey(params.id)
      .then(followedUser => {
        const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
        this.followList = this.database.list(`follows`)
        this.followList.snapshotChanges().map(actions => {
          return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        }).subscribe(items => {
          console.log('items', items);
          for (let i = 0; i < items.length; i++) {
            if (items[i].key === userId) {
              this.followed = items[i].hasOwnProperty(followedUser.key);
            }
          }
          return items.map(item => item.key);
        });
      })
      .catch( (error) => {
        console.log(error.code);
      });
  }
}
