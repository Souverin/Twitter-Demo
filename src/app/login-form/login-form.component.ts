import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
// import {AngularFireModule} from 'angularfire2';
// import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  that = this;
  constructor ( public router: Router) {}

  ngOnInit() {

    this.loginForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then( () => {
          this.router.navigate(['me']);
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
  emailIsInvalid() {
    return this.email != null && !this.email.valid && this.email.touched;
  }
  get email() {
    return this.loginForm.get('email').value;
  }
  get password() {
    return this.loginForm.get('password').value;
  }
  get thatThis() {
    return this.that;
  }
}
