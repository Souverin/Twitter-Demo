import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService} from '../services/auth.service';
import { patternValidator} from '../shared/pattern-validator';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  logged;

  constructor (  private router: Router,
                protected authService: AuthService) {}
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
      firebase.auth()
        .signInWithEmailAndPassword(this.email.value, this.password.value)
        .then( () => {
          this.router.navigate(['me']);
          this.authService.successfulLog = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert( errorMessage);
          // if (errorCode === 'auth/operation-not-allowed') {
          //   alert('Operation is not allowed');
          // } else {
          //   alert(errorMessage);
          // }
          // console.log(error);
        });
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
  NoPassword() {
    return !this.password['value'] && (this.password.touched || this.logged);
  }
  TooSmallPassword() {
    return this.password.errors != null && this.password.errors['minlength'] && (this.password.touched || this.logged);
  }
  TooBigPassword() {
    return this.password.errors != null && this.password.errors['maxlength'] && (this.password.touched || this.logged);
  }
}
