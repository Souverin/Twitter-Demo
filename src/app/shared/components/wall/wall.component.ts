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
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.postService.postsArray = [];
    this.route.params.subscribe(params => {
        this.key = this.route.routeConfig.path === 'me' ?
          JSON.parse(localStorage.getItem('loggedUserKey')) : params.id;
        this.postService.getPosts()
          .subscribe(postsList => {
            for (let i = 0; i < postsList.length; i++) {
              if (postsList[i]['key'] === this.key) {
                this.userService.getUserList()
                  .subscribe(userList => {
                    console.log('userList', userList);
                    for ( let j = 0; j < userList.length; j++) {
                      if (userList[j]['key'] === this.key) {
                        {
                          for (const prop in postsList[i]) {
                            if (prop !== 'key') {
                              postsList[i][prop].username = userList[j].firstName + ' ' + userList[j].lastName;
                              this.postService.postsArray.unshift(postsList[i][prop]);
                            }
                          }
                        }
                      }
                    }
                    // reject('no user');
                  }, error => {
                    console.log(error.message);
                  });
              }
            }
            // reject('no posts');
          }, error => {
            this.postService.noPosts = true;
            console.log(error.message);
          });
    });
  }

}
