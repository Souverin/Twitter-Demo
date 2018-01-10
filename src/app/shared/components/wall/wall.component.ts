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
  constructor(protected postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.key = this.route.routeConfig.path === 'me' ?
          JSON.parse(localStorage.getItem('loggedUserKey')) : params.id;
        this.postService.getPosts()
          .subscribe(postsList => {
            this.postService.renderPostsByKey(postsList, this.key);
          }, error => {
            this.postService.noPosts = true;
            console.log(error.message);
          });
    });
  }
}
