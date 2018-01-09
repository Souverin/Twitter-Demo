import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthService {
  posts;
  signInErrorMessage;
  signUpErrorMessage;
  usersList;
  constructor(private router: Router,
               protected userService: UserService,
              private database: AngularFireDatabase) { }
  signIn(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then( () => {
        localStorage.setItem('successfulLog', JSON.stringify(true));
        localStorage.setItem('loggedUserEmail', JSON.stringify(email));
        this.userService.getUserList().subscribe(userList => {
          for ( let i = 0; i < userList.length; i++) {
            if (userList[i]['email'] === email) {
              {
                localStorage.setItem('loggedUserKey', JSON.stringify(userList[i].key));
                localStorage.setItem('loggedUserFirstName', JSON.stringify(userList[i].firstName));
                localStorage.setItem('loggedUserLastName', JSON.stringify(userList[i].lastName));
                this.router.navigate([ 'me' ]);
              }
            }
          }
        });
      })
      .catch((error) => {
        this.signInErrorMessage = error.message;
        alert( error.message); // in template
      });
  }
  signUp(email: string, password: string, firstName: string, lastName: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('successfulLog', JSON.stringify(true));
        this.usersList = this.database.list('users');
        this.usersList.push({email: email, firstName: firstName, lastName: lastName});
        localStorage.setItem('loggedUserEmail', JSON.stringify(email));
        this.userService.getUserList().subscribe(userList => {
          for ( let i = 0; i < userList.length; i++) {
            if (userList[i]['email'] === email) {
              {
                localStorage.setItem('loggedUserKey', JSON.stringify(userList[i].key));
                localStorage.setItem('loggedUserFirstName', JSON.stringify(userList[i].firstName));
                localStorage.setItem('loggedUserLastName', JSON.stringify(userList[i].lastName));
                this.router.navigate([ 'me' ]);
              }
            }
          }
        });
      })
      .catch(function (error) {
        this.signUpErrorMessage = error.message;
        alert(this.signUpErrorMessage); // in template
      });
  }
}
