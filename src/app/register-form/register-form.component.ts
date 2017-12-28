import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UserIdInfo } from '../shared/userid-info';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})


export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  private basePath = '/usersIdInfo';
  usrIdInfo: FirebaseObjectObservable<UserIdInfo> = null;
  usrIdInfos: FirebaseListObservable<UserIdInfo[]> = null;
  constructor (private router: Router, private db: AngularFireDatabase) {
  }
  getUserIdInfo(key: string): FirebaseObjectObservable<UserIdInfo> {
    const usrIdInfoPath = `$(this.basePath}/${key}`;
    this.usrIdInfo = this.db.object(this.basePath);
    return this.usrIdInfo;
  }
  createuserIdInfo( usrIdInfo: UserIdInfo) {
    this.usrIdInfos.push(usrIdInfo);
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      'password': new FormControl(null),
      'email': new FormControl(null),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null)
    });
  }
  onSubmit() {
    console.log(this.email, this.password);
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['me']);
    })
      .then(() => {
        this.createuserIdInfo(this.getUserInfo);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/operation-not-allowed') {
          alert('Operation is not allowed');
        } else {
          alert(errorMessage);
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
