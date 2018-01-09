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
        this.userService.getUserByEmail(JSON.parse(localStorage.getItem('loggedUserEmail')))
          .then( user => {
            this.renderBriefUserInfo(user);
          });
      } else {
        this.userService.getUserByKey(params.id)
          .then((user) => {
            this.renderBriefUserInfo(user);
          })
          .catch( error => {
          });
      }
    });
  }
  renderBriefUserInfo (user) {
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
    this.userEmail = user.email;
    this.userKey = user.key;
    this.postService.getPostsLengthByKey(user.key)
      .then( posts => {
        this.postsTotal = posts;
        this.postService.noPosts = false;
      }, () => {
        this.postsTotal = 0;
        this.postService.noPosts = true;
      });
  }

}
