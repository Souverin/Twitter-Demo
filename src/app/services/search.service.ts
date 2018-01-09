import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class SearchService {

  constructor(private database: AngularFireDatabase) { }
  users;
  getUsers(start, end) {
    if (start === '') {
      return this.database.list('/users', ref =>
        ref.orderByChild('firstName').equalTo(start)
      );
    }
      return this.database.list('/users', ref =>
        ref.orderByChild('firstName').startAt(start).endAt(end)
      );
    }
}
