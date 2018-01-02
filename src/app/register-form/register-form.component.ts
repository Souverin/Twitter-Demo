import { Component, OnInit } from '@angular/core';
// import {FormControl, FormGroup} from '@angular/forms';
// import {  AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase';
// import { Router } from '@angular/router';
// import { UserIdInfo } from '../shared/userid-info';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {RenderMyPageService} from '../services/render-my-page.service';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})


export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  registered;
  constructor(protected renderMyPage: RenderMyPageService,
              protected authService: AuthService) {
    // const afList = db.list('items');
    // afList.push({name: 'item'});
    // const listObservable = afList.snapshotChanges();
    // listObservable.subscribe();
    // const relative = db.object(this.basePath).valueChanges();
  }

  ngOnInit() {
    this.authService.successfulLog = true;
    this.registerForm = new FormGroup({
      'password': new FormControl(null),
      'email': new FormControl(null),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null)
    });
  }
    onRegister() {
      console.log(this.registerForm);
      this.registered = true;
      if (!this.registerForm.valid) {
        return;
      }
      this.renderMyPage.renderRegisteredUserInfo (this.email.value, this.password.value, this.firstName.value, this.lastName.value);
      // console.log(!this.firstName['value'], this.firstName.touched, !this.firstName['value'] && this.firstName.touched);
      // firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value)
      //   .then(() => {
      //     this.router.navigate(['me']);
      //     this.successfulLog = true;
      //     this.usersList = this.database.list('users');
      //     this.usersList.push({email: this.email.value, firstName: this.firstName.value, lastName: this.lastName.value});
      //     console.log(this.usersList);
      //     this.listObservable = this.usersList.snapshotChanges();
      //     this.usersList.valueChanges().subscribe(user => {
      //       if (user) {
      //         console.log(user);
      //       }
      //     });
      //   })
      //   .catch(function (error) {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     if (errorCode === 'auth/operation-not-allowed') {
      //       alert('Operation is not allowed');
      //     } else {
      //       console.log(errorMessage);
      //     }
      //     console.log(error);
      //   });
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
}
