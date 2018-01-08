import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../services/follow.service';
import { FollowedComponent } from './followed/followed.component';

@Component({
  selector: 'app-follow-info',
  templateUrl: './follow-info.component.html',
  styleUrls: ['./follow-info.component.css']
})
export class FollowInfoComponent implements OnInit {
  followers = [ ];
  constructor(protected followService: FollowService) {  }

  ngOnInit() {
    const userKey = JSON.parse(localStorage.getItem('loggedUserKey'));
    this.followService.getFollowersByKey(userKey)
      .then( followers => {
        ;
        for (const prop in followers) {
          if (prop !== 'key') {
            for (const prop1 in followers[prop]) {
              this.followService.followersArray
                .push({firstName: followers[prop][prop1].firstName,
                  lastName: followers[prop][prop1].lastName, key: prop});
            }
          }
        }
        console.log('followersArray', this.followService.followersArray);
      })
      .catch( error => {
        console.log('noFollowers');
        this.followService.followersArray = [];
    });
  }

}
