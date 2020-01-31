import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewInit {

  selectedTab: string = 'editprofile';


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.userService.userProfile = this.activeRoute.snapshot.data.userData;
    this.titleService.setTitle("User Profile - Elderly Care Platform");

  }

  ngOnInit() {
    this.auth.userSource.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/');
      }
    })
  }

  ngAfterViewInit() {
    document.getElementById("myprofileHeader").focus();
  }


  viewEditProfile() {
    this.selectedTab = 'editprofile';
  }

  viewUserProfile() {
    this.selectedTab = 'viewprofile';
  }
}
