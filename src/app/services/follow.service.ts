import {Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FollowService implements OnInit {
  followed;
  followList;
  followersArray = [];
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
        this.followList = this.database.list(`follows/${userId}/${followedUser.key}`);
        console.log(this.followList);
        this.followList.remove();
        for (let i = 0; i < this.followersArray.length; i++) {
          if (this.followersArray[i].key === followedUser.key) {
            this.followersArray[i].splice(i, 1);
          }
        }
        console.log(this.followersArray);
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
  getFollowersByKey(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.list('follows').snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      }).subscribe(followsList => {
        for (let i = 0; i < followsList.length; i++) {
          if (followsList[i]['key'] === key) {
            resolve(followsList[i]);
          }
        }
        reject('no posts');
      });
    });
  }
}
