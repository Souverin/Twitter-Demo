import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthService {
  signInSubscription;
  signUpSubscription;
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
        this.signInSubscription = this.userService.getUserList().subscribe(userList => {
          this.navigateToMeAfterSuccessfulLoginAndSetLocalStorage(email, userList);
        });
      })
      .catch((error) => {
        console.log(error);
        this.signInErrorMessage = error.message;
        setTimeout(() => {
          this.signInErrorMessage = '';
        }, 5000);
      });
  }
  signUp(email: string, password: string, firstName: string, lastName: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.usersList = this.database.list('users');
        this.usersList.push({email: email, firstName: firstName, lastName: lastName});
        this.signUpSubscription = this.userService.getUserList().subscribe(userList => {
        this.navigateToMeAfterSuccessfulLoginAndSetLocalStorage (email, userList);
        });
      })
      .catch(function (error) {
        console.log(error);
        this.signUpErrorMessage = error.message;
        setTimeout(() => {
          this.signUpErrorMessage = '';
        }, 5000);
      });
  }
  navigateToMeAfterSuccessfulLoginAndSetLocalStorage (email, userList) {
    for ( let i = 0; i < userList.length; i++) {
      if (userList[i]['email'] === email) {
        {
          localStorage.setItem('successfulLog', JSON.stringify(true));
          localStorage.setItem('loggedUserEmail', JSON.stringify(email));
          localStorage.setItem('loggedUserKey', JSON.stringify(userList[i].key));
          localStorage.setItem('loggedUserFirstName', JSON.stringify(userList[i].firstName));
          localStorage.setItem('loggedUserLastName', JSON.stringify(userList[i].lastName));
          this.router.navigate([ 'me' ]);
          break;
        }
      }
    }
  }
}
