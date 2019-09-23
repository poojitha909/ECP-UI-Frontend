import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from 'src/app/core/interfaces';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  selectedTab: string = 'displayname';


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      response => {
        this.userService.userProfile = response;
        console.log(response);
      });
  }
}
