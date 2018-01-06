import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthService {
  posts;
  postsList;
  usersList;
  constructor(private router: Router,
               protected userService: UserService,
              private database: AngularFireDatabase) { }
  signIn(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then( (user) => {
        localStorage.setItem('successfulLog', JSON.stringify(true));
        localStorage.setItem('loggedUserEmail', JSON.stringify(email));
        this.router.navigate([ 'me' ]);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert( errorMessage);
      });
  }
  signUp(email: string, password: string, firstName: string, lastName: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('successfulLog', JSON.stringify(true));
        this.usersList = this.database.list('users');
        this.usersList.push({email: email, firstName: firstName, lastName: lastName});
        localStorage.setItem('loggedUserEmail', JSON.stringify(email));
        this.router.navigate(['me']); // goes in the end
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
}
