import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserService} from './user.service';

import 'rxjs/add/operator/do';

@Injectable()
export class PostService {

  constructor(private database: AngularFireDatabase,
              private userService: UserService) {
  }
  posts;
  postList;
  postsArray;
  noPosts = false;
  postsTotal;
  getPosts() {
    return  this.database.list('posts').snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      });
  }
  createPost(text: string) {
    this.postList = this.database.list(
      `posts/${JSON.parse(localStorage.getItem('loggedUserKey'))}`);
    this.postList.push({post: text, createdAt: Date()});
    if (this.noPosts) {
      this.noPosts = false;
    }
  }
  renderPostsByKey(postsList, key) {
    console.log('rendering posts');
    this.postsArray = [];
      for (let i = 0; i < postsList.length; i++) {
        if (postsList[i]['key'] === key) {
          this.userService.getUserList()
            .subscribe(userList => {
              for ( let j = 0; j < userList.length; j++) {
                if (userList[j]['key'] === key) {
                    for (const prop in postsList[i]) {
                      if (prop !== 'key') {
                        postsList[i][prop].username = userList[j].firstName + ' ' + userList[j].lastName;
                        this.postsArray.unshift(postsList[i][prop]);
                      }
                    }
                    break;
                }
              }
            }, error => {
              console.log(error.message);
            });
          break;
        }
      }
  }
}
