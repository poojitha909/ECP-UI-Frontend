import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewInit {

  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();

  selectedTab: string = 'viewprofile';
  eventEmitted: any;
  ViewEventEmitted: any;
  messages: any;
  subscription: Subscription;


  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.userService.userProfile = this.activeRoute.snapshot.data.userData;
    this.titleService.setTitle("User Profile - Joy of Age Platform");
  }

  ngOnInit() {
    this.subscription = this.userService.getFormEditMessage().subscribe(message => {
      this.messages = message;
    });
  }

  ngAfterViewInit() {
    document.getElementById("myprofileHeader").focus();
  }


  viewEditProfile(event) {
    console.log(event)
    this.eventEmitted = event;
    this.selectedTab = 'editprofile';
    this.editProfile.emit(event)
  }

  viewUserProfile(event) {
    this.ViewEventEmitted = event
    this.selectedTab = 'viewprofile';
  }


}
