import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import { UserIdInfo } from './userid-info';
@Injectable()
export class UseridServiceService {
  private basePath = '/usersIdInfo';
  constructor( private db: AngularFireDatabase) { }
  usrIdInfo: FirebaseObjectObservable<UserIdInfo> = null;
  usrIdInfos: FirebaseListObservable<UserIdInfo[]> = null;
  getUserIdInfo(key: string): FirebaseObjectObservable<UserIdInfo> {
    const usrIdInfoPath = `$(this.basePath}/${key}`;
    this.usrIdInfo = this.db.object(this.basePath);
    return this.usrIdInfo;
  }
  createuserIdInfo( usrIdInfo: UserIdInfo) {
    this.usrIdInfos.push(usrIdInfo);
  }
  private handleError(error) {
    console.log(error);
  }
}
