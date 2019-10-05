import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  selectedTab: string = 'displayname';


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.userSource.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/');
      }
    })
    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      response => {
        this.userService.userProfile = response;
        console.log(response);
      });
  }

  viewProfile() {
    this.selectedTab = 'editprofile';
    console.log(this.selectedTab);
  }
}
