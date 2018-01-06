import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-sb-else-wall',
  templateUrl: './sb-else-wall.component.html',
  styleUrls: ['./sb-else-wall.component.css']
})
export class SbElseWallComponent implements OnInit {
  key;
  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    // this.route.params.subscribe( params => {
    //   console.log(params);
    //   this.userService.getUserByKey(params.id)
    //     .then()
    // });
  }

}
