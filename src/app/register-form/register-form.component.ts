import { Component, OnInit } from '@angular/core';
// import {FormControl, FormGroup} from '@angular/forms';
// import {  AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase';
// import { Router } from '@angular/router';
// import { UserIdInfo } from '../shared/userid-info';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})


export class RegisterFormComponent implements OnInit {
  constructor (protected authService: AuthService) {
    // const afList = db.list('items');
    // afList.push({name: 'item'});
    // const listObservable = afList.snapshotChanges();
    // listObservable.subscribe();
    // const relative = db.object(this.basePath).valueChanges();
  }

  ngOnInit() {
    this.authService.intitializeNewFormGroup();
    // this.registerForm = new FormGroup({
    //   'password': new FormControl(null),
    //   'email': new FormControl(null),
    //   'firstName': new FormControl(null),
    //   'lastName': new FormControl(null)
    // });
  }

  // onSubmit() {
  //   console.log(this.email, this.password);
  //   firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
  //     .then(() => {
  //       this.router.navigate(['me']);
  //       this.authService.successfulLog = true;
  //       this.afList = this.db.list('users');
  //       this.afList.push({firstName: this.firstName, lastName: this.lastName});
  //       console.log(this.firstName, this.lastName, this.afList);
  //   })
  //     // .then(() => {
  //     //   this.createuserIdInfo(this.getUserInfo);
  //     // })
  //     .catch(function(error) {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       if (errorCode === 'auth/operation-not-allowed') {
  //         alert('Operation is not allowed');
  //       } else {
  //         alert(errorMessage);
  //       }
  //       console.log(error);
  //     });
  // }
  // emailIsInvalid() {
  //   return this.email != null && !this.email.valid && this.email.touched;
  // }
  // passwordIsTooBig ( ) {
  //   return this.password !== null && this.password.length > 20;
  // }
  // get email() {
  //   return this.registerForm.get('email').value;
  // }
  // get password() {
  //   return this.registerForm.get('password').value;
  // }
  // get firstName() {
  //   return this.registerForm.get('firstName').value;
  // }
  // get lastName() {
  //   return this.registerForm.get('lastName').value;
  // }
  // get getUserInfo() {
  //   return {
  //     email: this.email,
  //     lastName: this.lastName,
  //     firstName: this.firstName
  //   };
  // }
}
