import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  key;
  postsArray;
  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.postsArray = [];
    this.route.params.subscribe(params => {
        this.key = this.route.routeConfig.path === 'me' ?
          JSON.parse(localStorage.getItem('loggedUserKey')) : params.id;
        this.postService.getPostsByKey(this.key)
          .then(posts => {
            this.userService.getUserByKey(this.key)
              .then( user => {
                for (const prop in posts) {
                  if (prop !== 'key') {
                    console.log('posts[prop]', posts[prop]);
                    posts[prop].username = user.firstName + ' ' + user.lastName;
                    this.postsArray.unshift(posts[prop]);
                  }
                }
              });
          });
    });
  }

}
