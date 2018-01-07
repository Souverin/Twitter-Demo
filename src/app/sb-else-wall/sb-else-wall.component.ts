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
    console.log('SbElseWallOnInit');
    this.route.params.subscribe( params => {
      console.log(params);
      this.userService.getUserByKey(params.id)
        .then(arg => {
          if (arg.email === JSON.parse(localStorage.getItem('loggedUserEmail'))) {
            this.router.navigate(['me']);
          }
          console.log('arg.key', arg.key);
          localStorage.setItem('currUserKey', JSON.stringify(arg.key));
        })
        .catch( (error) => {
          console.log(error.code);
          this.router.navigate(['me']);
      });
    });
  }

}
