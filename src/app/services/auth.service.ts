import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
@Injectable()

export class AuthService {
  successfulLog;
  userId;
  afList;
  listObservable;
  registerForm: FormGroup;
  private basePath = '/usersIdInfo';
  constructor (private router: Router,
               private db: AngularFireDatabase) {
  }
  intitializeNewFormGroup () {
    this.registerForm = new FormGroup({
      'password': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null)
    });
  }
  onRegister() {
    console.log(this.email, this.password);
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['me']);
        this.successfulLog = true;
        this.afList = this.db.list('users');
        this.afList.push({email: this.email, firstName: this.firstName, lastName: this.lastName});
        this.listObservable = this.afList.snapshotChanges();
        this.afList.valueChanges().subscribe(user => {
          if (user) {
            this.userId = user.uid;
            console.log(user);
            console.log(this.userId); // trash
          }
        });
      })
      .catch(function(error) {
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
  emailIsInvalid() {
    return this.email != null && !this.email.valid && this.email.touched;
  }
  passwordIsTooBig ( ) {
    return this.password !== null && this.password.length > 20;
  }
  get email() {
    return this.registerForm.get('email').value;
  }
  get password() {
    return this.registerForm.get('password').value;
  }
  get firstName() {
    return this.registerForm.get('firstName').value;
  }
  get lastName() {
    return this.registerForm.get('lastName').value;
  }
  get getUserInfo() {
    return {
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName
    };
  }
}
