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
            console.log('dataFromGetByMail', user);
            this.userFirstName = user.firstName;
            this.userLastName = user.lastName;
            this.userEmail = user.email;
            this.userKey = user.key;
            this.postService.getPostsLengthByKey(user.key)
              .then( posts => {
                console.log('arg', posts);
                this.postsTotal = posts;
              });
          });
      } else {
        console.log('params', params);
        this.userService.getUserByKey(params.id)
          .then((user) => {
            console.log('data', user);
            this.userFirstName = user.firstName;
            this.userLastName = user.lastName;
            this.userEmail = user.email;
            this.userKey = user.key;
            this.postService.getPostsLengthByKey(user.key)
              .then( posts => {
                console.log('arg', posts);
                this.postsTotal = posts;
              });
          })
          .catch( error => {
            console.log(error.code);
          });
      }
    });
    // if (this.route.routeConfig.path === 'me') {
    //   this.userService.getUserByEmail(JSON.parse(localStorage.getItem('loggedUserEmail')))
    //     .then( user => {
    //       console.log('dataFromGetByMail', user);
    //       this.userFirstName = user.firstName;
    //       this.userLastName = user.lastName;
    //       this.userEmail = user.email;
    //       this.userKey = user.key;
    //       debugger;
    //       this.postService.getPostsLengthByKey(user.key)
    //         .then( arg => {
    //           console.log('arg', arg);
    //           this.postsTotal = arg;
    //         });
    //     });
    // } else {
    //   debugger;
    //   this.userService.getUserByKey(JSON.parse(localStorage.getItem('currUserKey')))
    //     .then((data) => {
    //       console.log('data', data);
    //     });
    // }


  }

}
