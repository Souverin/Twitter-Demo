import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-found-list',
  templateUrl: './found-list.component.html',
  styleUrls: ['./found-list.component.css']
})
export class FoundListComponent implements OnInit {
  @Input() users;
  constructor() { }

  ngOnInit() {
  }

}
