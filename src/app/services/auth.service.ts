import { Injectable, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import { patternValidator} from '../shared/pattern-validator';

@Injectable()

export class AuthService {
  successfulLog;
  registered;
  constructor () {
  }
}
