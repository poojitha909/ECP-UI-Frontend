import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal-component';

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
  messages:any;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private modalService:NgbModal
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

    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      console.log(message,"message from contact detial component")
      this.messages=message;
    })
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
  this.ViewEventEmitted=event
    this.selectedTab = 'viewprofile';
  }
  
 
}
