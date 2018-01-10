import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class SearchService {

  constructor(private database: AngularFireDatabase) { }
  users;
  getUsersByFirstName(start, end) {
      return this.database.list('/users', ref =>
        ref.orderByChild('firstName').startAt(start).endAt(end)
      );
    }
  getUsersByLastName(start, end) {
    return this.database.list('/users', ref =>
      ref.orderByChild('lastName').startAt(start).endAt(end)
    );
  }
}
