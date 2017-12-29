import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class DisplayService {

  constructor(private authService: AuthService) { }

  displayUserName () {

  }
}
