import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  posts;

  constructor() { }

  ngOnInit() {
    this.posts = [`The new syntax has a couple of things to note.The first is *ngFor.The * is a shorthand for using the new Angular template syntax with the template tag.`];
    for ( let i = 0; i < 10; i++) {
      this.posts.push(this.posts[0]);
    }
  }

}
