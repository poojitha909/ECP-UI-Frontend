import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  selectedTab: string = 'viewprofile';
  eventEmitted: any;
  ViewEventEmitted: any;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.userService.userProfile = this.activeRoute.snapshot.data.userData;
  }

  ngOnInit() {
    this.auth.userSource.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/');
      }
    })
}


  viewEditProfile(event) {
      console.log(event)
      this.eventEmitted = event;
      this.selectedTab = 'editprofile';
  }

  viewUserProfile(event) {
  this.ViewEventEmitted=event
    this.selectedTab = 'viewprofile';
  }
  
}
