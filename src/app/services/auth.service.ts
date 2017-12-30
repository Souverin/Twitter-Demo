import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import { patternValidator} from '../shared/pattern-validator';

@Injectable()

export class AuthService {
  // loginForm: FormGroup;
  // formIsInvalid;
  successfulLog;
  userId;
  afList;
  listObservable;
  registerForm: FormGroup;
  private basePath = '/usersIdInfo';
  registered;
  constructor (private router: Router,
               private db: AngularFireDatabase) {
  }
  // initializeNewLoginFormGroup () {
  //   this.successfulLog = false;
  //   this.loginForm = new FormGroup({
  //     'password': new FormControl(null,
  //       [Validators.required,
  //         Validators.maxLength(20),
  //         Validators.minLength(6)]),
  //     'email': new FormControl(null,
  //       [Validators.required,
  //         Validators.email,
  //         patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  //   });
  // }
  initializeNewRegisterFormGroup () {
    this.registered = false;
    this.registerForm = new FormGroup({
      'password': new FormControl(null,
        [Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6)]),
      'email': new FormControl(null,
        [Validators.required,
          Validators.email,
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required)
    });
  }
  // onLogin() {
  //   if (!this.email.valid || !this.password.valid) {
  //     return;
  //   }
  //   firebase.auth()
  //     .signInWithEmailAndPassword(this.email.value, this.password.value)
  //     .then( () => {
  //       this.router.navigate(['me']);
  //       this.successfulLog = true;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       alert( errorMessage);
  //       // if (errorCode === 'auth/operation-not-allowed') {
  //       //   alert('Operation is not allowed');
  //       // } else {
  //       //   alert(errorMessage);
  //       // }
  //       // console.log(error);
  //     });
  // }
  onRegister() {
    console.log(this.registerForm)
    this.registered = true;
    if (!this.registerForm.valid) {
      return;
    }
    console.log(!this.firstName['value'], this.firstName.touched, !this.firstName['value'] && this.firstName.touched);
    firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value)
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
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get getUserInfo() {
    return {
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName
    };
  }
  emailIsInvalid() {
    return this.email != null && !this.email.valid && (this.email.touched || this.registered);
  }
  NoPassword() {
    return !this.password['value'] && (this.password.touched || this.registered);
  }
  TooSmallPassword() {
    return this.password.errors != null && this.password.errors['minlength'] && (this.password.touched || this.registered);
  }
  TooBigPassword() {
    return this.password.errors != null && this.password.errors['maxlength'] && (this.password.touched || this.registered);
  }
  NoFirstName() {
    return !this.firstName['value'] && (this.firstName.touched || this.registered);
  }
  NoLastName() {
    return !this.lastName['value'] && (this.lastName.touched || this.registered);
  }
}
