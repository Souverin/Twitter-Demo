import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {patternValidator} from '../shared/pattern-validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})


export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  registered;
  constructor(protected authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'password': new FormControl(null, [Validators.required,
        Validators.maxLength(20),
        Validators.minLength(6)]),
      'email': new FormControl(null,
        [Validators.required, Validators.email]),
      'firstName': new FormControl(null, [Validators.required, patternValidator(/^[A-Z]/)]),
      'lastName': new FormControl(null, [Validators.required, patternValidator(/^[A-Z]/)])
    });
  }
    onRegister() {
      this.registered = true;
      if (!this.registerForm.valid) {
        return;
      }
      this.authService.signUp (this.email.value, this.password.value, this.firstName.value, this.lastName.value);
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
    emailIsInvalid() {
      return this.email != null && !this.email.valid && (this.email.touched || this.registered);
    }
    noPassword() {
      return !this.password['value'] && (this.password.touched || this.registered);
    }
    tooSmallPassword() {
      return this.password.errors != null && this.password.errors['minlength'] && (this.password.touched || this.registered);
    }
    tooBigPassword() {
      return this.password.errors != null && this.password.errors['maxlength'] && (this.password.touched || this.registered);
    }
    noFirstName() {
      return !this.firstName['value'] && (this.firstName.touched || this.registered);
    }
    noLastName() {
      return !this.lastName['value'] && (this.lastName.touched || this.registered);
    }
    firstNameNotUppercase() {
      return this.firstName.errors != null && this.firstName.errors.patternInvalid && (this.lastName.touched || this.registered);
    }
    lastNameNotUppercase() {
      return this.lastName.errors != null && this.lastName.errors.patternInvalid && (this.lastName.touched || this.registered);
    }
}
