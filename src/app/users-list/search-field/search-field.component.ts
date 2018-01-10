import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../services/search.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit, OnDestroy{
  searchForm: FormGroup;
  constructor(protected searchService: SearchService,
              protected userService: UserService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    });
    this.userService.getUserList()
      .subscribe( users => {
        this.renderUsersList(users, false);
      });
    this.searchForm.valueChanges.subscribe( text => {
      if (text.search) {
        text.search = text.search[0].toUpperCase() + text.search.slice(1);
        console.log(text);
      }
      this.searchService.getUsersByFirstName(text.search, text.search + '\uf8ff').snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      }).subscribe( users => {
        // debugger;
        this.renderUsersList(users, false);
        if (text.search !== '') {
          this.searchService.getUsersByLastName(text.search, text.search + '\uf8ff').snapshotChanges().map(actions => {
            return actions.map(action => ({key: action.key, ...action.payload.val()}));
          }).subscribe( userss => {
            // debugger;
            this.renderUsersList(userss, true);
          });
        }
      });
    });
  }
  ngOnDestroy () {
    this.searchService.users = [];
  }
  renderUsersList (users, byLastName) {
    if (!byLastName) {this.searchService.users = []; }
    let loggedUserIndex;
    let loggedUserInList = false;
    for ( let i = 0; i < users.length; i++) {
      if (users[i].email
        === JSON.parse(localStorage.getItem('loggedUserEmail'))) {
        loggedUserIndex = i;
        loggedUserInList = true;
      }
    }
    if (loggedUserInList) {
      users.splice(loggedUserIndex, 1);
    }
    this.searchService.users.push.apply(this.searchService.users, users);
    this.searchService.users = this.noDuplication(this.searchService.users);

  }
  noDuplication (array) {
    for (let i = 0; i < array.length; i++) {
      for ( let j = i + 1; j < array.length; j++) {
        if (array[j].email === array[i].email) {
          array.splice(j, 1);
        }
      }
    }
    return array;
  }
}
