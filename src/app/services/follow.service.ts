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
      this.userService.getUserList()
        .subscribe(userList => {
          console.log('userList', userList);
          for ( let i = 0; i < userList.length; i++) {
            if (userList[i]['key'] === params.id) {
              const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
              this.followList = this.database.object(`follows/${userId}/${userList[i].key}`);
              this.followList.set({followedUserFirstName: userList[i].firstName, followedUserLastName: userList[i].lastName});
            }
          }
        }, (error) => {
          console.log(error.code);
        });
  }
  unfollow (params) {
    this.followed = false;
    console.log(params.id);
    this.userService.getUserList()
      .subscribe(userList => {
        for ( let i = 0; i < userList.length; i++) {
          if (userList[i]['key'] === params.id) {
            const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
            this.followList = this.database.object(`follows/${userId}/${userList[i].key}`);
            this.followList.remove();
            for (let j = 0; j < this.followedArray.length; j++) {
              if (this.followedArray[j].key === userList[i].key) {
                this.followedArray[j].splice(i, 1);
              }
            }
            console.log(this.followedArray);
          }
        }
        // reject('no user');
      }, (error) => {
        console.log(error.code);
      });
  }
  isFollowed (params) {
    this.userService.getUserList()
      .subscribe(userList => {
        for ( let i = 0; i < userList.length; i++) {
          if (userList[i]['key'] === params.id) {
            const userId = JSON.parse(localStorage.getItem('loggedUserKey'));
            this.getFollowedList()
              .subscribe(items => {
              for (let j = 0; j < items.length; j++) {
                if (items[j].key === userId) {
                  this.followed = items[j].hasOwnProperty(userList[i].key);
                }
              }
              return items.map(item => item.key);
            });
          }
        }
      }, (error) => {
        console.log(error.code);
      });
  }
  getFollowedList() {
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
