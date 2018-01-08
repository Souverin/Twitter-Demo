import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../services/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  searchForm: FormGroup;
  users;
  startAt = new Subject();
  endAt = new Subject();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getUser(this.startAt, this.endAt).valueChanges()
      .subscribe( users => this.users = users);
    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    });
    this.searchForm.valueChanges.subscribe( (arg) => {
      console.log(arg.search);
    });
  }
  search($event) {
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }
}
