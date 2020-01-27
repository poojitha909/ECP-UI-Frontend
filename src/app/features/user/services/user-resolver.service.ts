import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve() {
    return this.userService.getUserProfile();
  }
}
