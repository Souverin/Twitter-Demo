import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-news-form',
  templateUrl: './post-news-form.component.html',
  styleUrls: ['./post-news-form.component.css']
})
export class PostNewsFormComponent implements OnInit {
  postForm: FormGroup;
  clicked;
  constructor(private database: AngularFireDatabase,
              private router: Router,
              private postService: PostService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'textarea': new FormControl(null, [Validators.required, Validators.maxLength(280)])
      });
  }
  onPost() {
    this.clicked = true;
    if (this.postForm.invalid) {
      return;
    }
    this.postService.createPost(this.textarea.value);
    this.postForm.reset();
  }
  get textarea () {
    return this.postForm.get('textarea');
  }
  tooManySymbols() {
    return this.textarea.errors != null && this.textarea.errors['maxlength'] && (this.textarea.touched || this.clicked);
  }
}
