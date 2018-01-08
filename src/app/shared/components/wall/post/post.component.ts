import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../../../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postInfo: {post: string, createdAt: string, username: string};
  constructor(protected postService: PostService) { }

  ngOnInit() {
  }

}
