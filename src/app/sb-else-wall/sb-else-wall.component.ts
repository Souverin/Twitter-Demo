import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService} from '../services/user.service';
import {FollowService} from '../services/follow.service';

@Component({
  selector: 'app-sb-else-wall',
  templateUrl: './sb-else-wall.component.html',
  styleUrls: ['./sb-else-wall.component.css']
})
export class SbElseWallComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              protected followService: FollowService) { }

  ngOnInit() {
    this.followService.followed = false;
    this.route.params.subscribe( params => {
      this.followService.isFollowed(params);
      this.userService.getUserList()
        .subscribe(userList => {
          for ( let i = 0; i < userList.length; i++) {
            if (userList[i]['key'] === params.id) {
              if (userList[i].email === JSON.parse(localStorage.getItem('loggedUserEmail'))) {
                this.router.navigate(['me']);
              }
              localStorage.setItem('currUserKey', JSON.stringify(userList[i].key));
            }
          }
        }, (error) => {
          console.log(error.code);
          this.router.navigate(['me']);
        });
    });
  }
  onFollow () {
    this.route.params.subscribe( params => {
      this.followService.follow(params);
    });
  }
  onUnfollow () {
    this.route.params.subscribe( params => {
      this.followService.unfollow(params);
    });
  }

}
