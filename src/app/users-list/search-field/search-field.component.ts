import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit, OnDestroy{
  searchForm: FormGroup;

  constructor(protected searchService: SearchService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    });
    this.searchForm.valueChanges.subscribe( text => {
      console.log(text);
      this.searchService.getUsers(text.search, text.search + '\uf8ff').snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      }).subscribe( users => {
        let loggedUserIndex;
        let loggedUserInList = false;
        for ( let i = 0; i < users.length; i++) {
          if (users[i].email
            === JSON.parse(localStorage.getItem('loggedUserEmail'))) {
            loggedUserIndex = i;
            loggedUserInList = true;
          }
        }
        this.searchService.users = users;
        if (loggedUserInList) {
          this.searchService.users.splice(loggedUserIndex, 1);
        }
      });
    });
  }
  ngOnDestroy () {
    this.searchService.users = [];
  }
}
