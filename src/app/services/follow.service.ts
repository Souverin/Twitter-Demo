import {Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FollowService implements OnInit {
  followed;
  followList;
  followedArray = [];
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
          this.followList = this.database.object(`follows/${userId}/${followedUser.key}`);
          this.followList.set({followedUserFirstName: followedUser.firstName, followedUserLastName: followedUser.lastName});
        })
        .catch( (error) => {
          console.log(error.code);
        });
  }
  unfollow (params) {
    this.followed = false;
    console.log(params.id);
    this.userService.getUserByKey(params.id)
      .then(followedUser => {
        const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
        this.followList = this.database.object(`follows/${userId}/${followedUser.key}`);
        this.followList.remove();
        for (let i = 0; i < this.followedArray.length; i++) {
          if (this.followedArray[i].key === followedUser.key) {
            this.followedArray[i].splice(i, 1);
          }
        }
        console.log(this.followedArray);
      })
      .catch( (error) => {
        console.log(error.code);
      });
  }
  isFollowed (params) {
    this.userService.getUserByKey(params.id)
      .then(followedUser => {
        const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
        this.followList = this.database.list(`follows`);
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
  getFollowed() {
      return this.database.list('follows').snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      });

  }
  renderFollowedArrayByKey (followed, userKey) {
    this.followedArray = [];
    for (let i = 0; i < followed.length; i++) {
      if (followed[i].key === userKey) {
        for (const prop in followed[i]) {
          if (prop !== 'key') {
            this.followedArray
              .push({firstName: followed[i][prop].followedUserFirstName,
                lastName: followed[i][prop].followedUserLastName, key: prop});
          }
        }
      }
    }
  }
}
