import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../shared/pattern-validator';
@Component({
  selector: 'app-post-news-form',
  templateUrl: './post-news-form.component.html',
  styleUrls: ['./post-news-form.component.css']
})
export class PostNewsFormComponent implements OnInit {
  postForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'textarea': new FormControl(null)
      });
  }
  onPost() {
    console.log(this.textarea.value);
  }
  get textarea () {
    return this.postForm.get('textarea');
  }
}
