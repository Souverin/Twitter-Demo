import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';

@Injectable()
export class RenderMyPageService {
  posts;
  postsList;
  usersList;
  listObservable;
  loggedUserFirstName;
  loggedUserLastName;
  constructor(private router: Router,
              protected authService: AuthService,
              private database: AngularFireDatabase) { }
  renderUserInfo(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then( metadata => {
        localStorage.setItem('successfulLog', JSON.stringify(true));

        this.usersList = this.database.list('users');
        this.usersList.snapshotChanges().map(actions => {
          console.log('actions', actions);
          return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        }).subscribe(users => {
          console.log(users);
          if (users) {
            this.getUserByEmail(metadata.email)
              .then( loggedUser => {
                console.log('dataFromGetByMail', loggedUser);
                localStorage.setItem('loggedUserFirstName', JSON.stringify(loggedUser.firstName));
                localStorage.setItem('loggedUserLastName', JSON.stringify(loggedUser.lastName));
                localStorage.setItem('loggedUserEmail', JSON.stringify(loggedUser.email));
                localStorage.setItem('loggedUserKey', JSON.stringify(loggedUser.key));
              }).then(arg => {
              this.getPostsByKey(JSON.parse(localStorage.getItem('loggedUserKey'))).then( posts => {
                console.log('posts from logged user', posts);
                this.posts = posts;
                this.router.navigate([ 'me' ]);
              });
            });
          }
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert( errorMessage);
      });
  }
  renderRegisteredUserInfo (email: string, password: string, firstName: string, lastName: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((metadata) => {
        // this.authService.successfulLog = true;
        localStorage.setItem('successfulLog', JSON.stringify(true));
        this.usersList = this.database.list('users');
        this.usersList.push({email: email, firstName: firstName, lastName: lastName});
        console.log('UsersList', this.usersList);
        this.listObservable = this.usersList.snapshotChanges();
        console.log(this.listObservable);

        this.getAllPosts('dsg');
        this.usersList.valueChanges().subscribe(users => {
          if (users) {
            console.log('email', metadata.email);
            console.log('users', users);
            this.getUserByEmail(metadata.email)
              .then( loggedUser => {
                console.log('dataFromGetByMail', loggedUser);
                localStorage.setItem('loggedUserFirstName', JSON.stringify(loggedUser.firstName));
                localStorage.setItem('loggedUserLastName', JSON.stringify(loggedUser.lastName));
                localStorage.setItem('loggedUserEmail', JSON.stringify(loggedUser.email));
                this.router.navigate(['me']); // goes in the end
              });
          }
        });
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/operation-not-allowed') {
          alert('Operation is not allowed');
        } else {
          console.log(errorMessage);
        }
        console.log(error);
      });
  }
  getUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.list('users').snapshotChanges().map(actions => {
        console.log('actions', actions);
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(userList => {
        console.log('userList', userList);
        for ( let i = 0; i < userList.length; i++) {
          if (userList[i]['email'] === email) {
            resolve(userList[i]);
          }
        }
        reject('no user');
      });
    });
  }

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

  // getAllPosts(loginUserId: string): Promise<any> {
  //
  //   return new Promise((resolve, reject) => {
  //     this.database.list('posts').valueChanges().subscribe(
  //       (posts) => {
  //         debugger;
  //         console.log(posts[0][loginUserId])
  //         resolve(posts[loginUserId]);
  //       },
  //       (error) => {
  //         reject(error);
  //       },
  //     );
  //
  //   });
  // }

  getAllPosts(loginUserId: string) {
    this.database.list('posts').valueChanges().subscribe( posts => {
      console.log('posts from getAllPosts', posts);
      return posts;
    });
  }

  findPostById(posts = [], loginUserId: string): Array<any> {
    return posts.filter((post) => post.userId === loginUserId);
  }

}
