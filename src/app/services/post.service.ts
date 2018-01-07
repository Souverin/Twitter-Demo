import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostService {

  constructor(private database: AngularFireDatabase) { }
  postList;
  getPostsByKey(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.list('posts').snapshotChanges().map(actions => {
        console.log('actions', actions);
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(postsList => {
        console.log('postsList', postsList);
        for (let i = 0; i < postsList.length; i++) {
          if (postsList[i]['key'] === key) {
            resolve(postsList[i]);
          }
        }
        reject('no posts');
      });
    });
  }
  getPostsLengthByKey(key: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.database.list('posts').snapshotChanges().map(actions => {
        console.log('actions', actions);
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(postsList => {
        console.log('postsList', postsList);
        for (let i = 0; i < postsList.length; i++) {
          if (postsList[i]['key'] === key) {
            let size = -1;
            for (const prop in postsList[i]) {
              if (postsList[i].hasOwnProperty(prop)) {
                size++;
              }
            }
            resolve(size);
          }
        }
        reject('no posts');
      });
    });
  }
  createPost(text: string) {
    console.log(text);
    this.postList = this.database.list(
      `posts/${JSON.parse(localStorage.getItem('loggedUserKey'))}`);
    return Observable.of(this.postList.push({post: text, createdAt: Date()}));
    // this.postList.valueChanges()
    //   .subscribe(data => {
    //   if (data) {
    //     console.log('data', data);
    //   }
    // });
  }
  // addPost(post: Post): Observable<any> {
  //   return Observable.of(this.db.list('posts').push(post));
  // }
}
