import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(private database: AngularFireDatabase) { }
  getUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.list('users').snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(userList => {
        for ( let i = 0; i < userList.length; i++) {
          if (userList[i]['email'] === email) {
            resolve(userList[i]);
          }
        }
        reject('no user');
      });
    });
  }
  getUserByKey(userKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.list('users').snapshotChanges().map(actions => {
        console.log('actions', actions);
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(userList => {
        console.log('userList', userList);
        for ( let i = 0; i < userList.length; i++) {
          if (userList[i]['key'] === userKey) {
            resolve(userList[i]);
          }
        }
        reject('no user');
      });
    });
  }
}
