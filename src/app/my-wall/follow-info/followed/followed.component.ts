import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.css']
})
export class FollowedComponent implements OnInit {
  @Input() followInfo: {firstName: string, lastName: string, key: string};
  constructor() { }

  ngOnInit() {
  }

}
