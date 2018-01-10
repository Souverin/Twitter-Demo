import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {PostService} from './post.service';

@Injectable()
export class UserService {

  constructor( private database: AngularFireDatabase ) { }
  userFirstName;
  userLastName;
  userEmail;
  userKey;
  getUserList() {
      return this.database.list('users').snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      });
  }
}
