import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brief-user-info',
  templateUrl: './brief-user-info.component.html',
  styleUrls: ['./brief-user-info.component.css']
})
export class BriefUserInfoComponent implements OnInit {
  userFirstName;
  userLastName;
  userEmail;
  userKey;
  postsTotal;
  constructor(private userService: UserService,
              private postService: PostService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.route.routeConfig.path === 'me') {
        this.userService.getUserList()
          .subscribe(userList => {
            for ( let i = 0; i < userList.length; i++) {
              if (userList[i]['email'] === JSON.parse(localStorage.getItem('loggedUserEmail'))) {
                this.renderBriefUserInfo(userList[i]);
              }
            }
          });
      } else {
        this.userService.getUserList()
          .subscribe(userList => {
            console.log('userList', userList);
            for ( let i = 0; i < userList.length; i++) {
              if (userList[i]['key'] === params.id) {
                this.renderBriefUserInfo(userList[i]);
              }
            }
            // reject('no user');
          }, error => {
            console.log(error.message);
          });
      }
    });
  }
  renderBriefUserInfo (user) {
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
    this.userEmail = user.email;
    this.userKey = user.key;
    this.postService.getPosts()
      .subscribe(postsList => {
        let size = -1;
        for (let i = 0; i < postsList.length; i++) {
          if (postsList[i]['key'] === user.key) {

            for (const prop in postsList[i]) {
              if (postsList[i].hasOwnProperty(prop)) {
                size++;
              }
            }
          }
          this.postsTotal = (size === -1) ? 0 : size;
          this.postService.noPosts = size === 0;
        }
      });
  }

}
