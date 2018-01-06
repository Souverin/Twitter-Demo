import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postInfo: {post: string, createdAt: string};
  constructor() { }

  ngOnInit() {
    this.data = new Date();
    this.post = 'The new syntax has a couple of things to note.The first is *ngFor.The * is a shorthand for using the new Angular template syntax with the template tag.';
  }

}
