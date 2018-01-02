import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService} from '../services/auth.service';
import { RenderMyPageService} from '../services/render-my-page.service';
import { patternValidator} from '../shared/pattern-validator';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  logged;
  constructor (  private router: Router,
                protected authService: AuthService,
                 private database: AngularFireDatabase,
                 private renderMyPage: RenderMyPageService) {}
  ngOnInit() {
    // this.authService.initializeNewLoginFormGroup();
    this.authService.successfulLog = false;
    this.loginForm = new FormGroup({
      'password': new FormControl(null,
        [Validators.required,
        Validators.maxLength(20),
          Validators.minLength(6)]),
      'email': new FormControl(null,
        [Validators.required,
        Validators.email,
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });
  }
  onLogin() {
    this.logged = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.renderMyPage.renderUserInfo(this.email.value, this.password.value);
      // firebase.auth()
      //   .signInWithEmailAndPassword(this.email.value, this.password.value)
      //   .then( metadata => {
      //     console.log('metadata', metadata);
      //     // some function that handles the stuff
      //     this.authService.successfulLog = true;
      //     this.usersList = this.database.list('users');
      //     this.listObservable = this.usersList.snapshotChanges();
      //     this.usersList.valueChanges().subscribe(users => {
      //       if (users) {
      //         console.log('email', metadata.email);
      //         console.log('users', users);
      //         this.getUserByEmail(metadata.email)
      //           .then( loggedUser => {
      //             console.log('dataFromGetByMail', loggedUser);
      //             localStorage.setItem('loggedUserFirstName', JSON.stringify(loggedUser.firstName));
      //             localStorage.setItem('loggedUserLastName', JSON.stringify(loggedUser.lastName));
      //           });
      //         // this.getUserByEmail(loggedUser.email)
      //         //   .then( key => {
      //         //     console.log(key);
      //         //   });
      //         // this.getSingleUser(loggedUser.uid)
      //         //   .then(key => {
      //         //     console.log('key', key);
      //         //     localStorage.setItem('user-login', JSON.stringify({ email: this.email.value, key: key }));
      //         //   })
      //         //   .catch((err) => {
      //         //     console.log(err);
      //         //   });
      //
      //         // for (let i = 0; i < user.length; i++) {
      //         //   if (user[i].email === this.email.value) {
      //         //     localStorage.setItem('currUser', JSON.stringify(user[i]));
      //         //     this.authService.currUser = JSON.parse(localStorage.getItem('currUser'));
      //         //   }
      //         // }
      //       }
      //     });
      //     this.router.navigate(['me']); // goes in the end
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     alert( errorMessage);
      //   });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  emailIsInvalid() {
    return this.email != null && !this.email.valid && (this.email.touched || this.logged);
  }
  noPassword() {
    return !this.password['value'] && (this.password.touched || this.logged);
  }
  tooSmallPassword() {
    return this.password.errors != null && this.password.errors['minlength'] && (this.password.touched || this.logged);
  }
  tooBigPassword() {
    return this.password.errors != null && this.password.errors['maxlength'] && (this.password.touched || this.logged);
  }
}
