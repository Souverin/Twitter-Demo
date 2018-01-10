import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  logged;
  constructor (protected authService: AuthService) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      'password': new FormControl(null,
        [Validators.required,
        Validators.maxLength(20),
          Validators.minLength(6)]),
      'email': new FormControl(null,
        [Validators.required,
        Validators.email])
    });
  }
  onLogin() {
    this.logged = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.signIn(this.email.value, this.password.value);
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
