import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-post-news-form',
  templateUrl: './post-news-form.component.html',
  styleUrls: ['./post-news-form.component.css']
})
export class PostNewsFormComponent implements OnInit {
  postForm: FormGroup;
  postList;
  listObservable;
  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'textarea': new FormControl(null, [Validators.required, Validators.maxLength(280)])
      });
  }
  onPost() {
    console.log(this.textarea.value);
    console.log('keyvalue', );
    this.postList = this.database.list(
      `posts/${JSON.parse(localStorage.getItem('loggedUserKey'))}`);
    this.postList.push({post: this.textarea.value, createdAt: new Date()});
    console.log('postList', this.postList);
    this.listObservable = this.postList.snapshotChanges();
    console.log('snapshot changes', this.listObservable)
    this.postList.valueChanges().subscribe(data => {
      if (data) {
        console.log('data', data);
      }
    });

  }
  get textarea () {
    return this.postForm.get('textarea');
  }
}
