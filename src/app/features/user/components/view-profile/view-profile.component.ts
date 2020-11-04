import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core';
import { Gender, monthOptions } from 'src/app/core/interfaces';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal-component';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();

  gender: string;
  messages: any;
  subscription: Subscription;
  dob: string;

  isLetterEditDisabled: boolean = true;
  otpModalShow: boolean = false;
  otpMobile: string;
  newsLetterSubscriptionStatus: boolean;
  isLoading = false;

  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.gender = Object.keys(Gender).find(key => Gender[key] === this.userService.userProfile.individualInfo.gender);

    if (this.userService.userProfile.individualInfo.dob) {
      let month = "";
      if (this.userService.userProfile.individualInfo.dob.split("-")[0]) {
        const monthName = monthOptions.find(month => month.value === this.userService.userProfile.individualInfo.dob.split("-")[0]);
        if (monthName) {
          month = monthName.name;
        }
      }
      const day = `${this.userService.userProfile.individualInfo.dob.split("-")[1] ? this.userService.userProfile.individualInfo.dob.split("-")[1] : ''}`;
      const year = `${this.userService.userProfile.individualInfo.dob.split("-")[2] ? this.userService.userProfile.individualInfo.dob.split("-")[2] : ''}`;
      if (month || day || year) {
        this.dob = `${month} ${day} ${year}`;
      }
    }

    try { this.newsLetterSubscriptionStatus = JSON.parse(this.userService.userProfile.basicProfileInfo.isSubscribedForNewsletter + "".toLowerCase()); } catch (e) { console.warn(e) }
  }

  edit(actionName) {
    // console.log('edit')
    this.editProfile.emit({ obj: "", action: actionName });
  }

  showOtpModal() {
    this.otpModalShow = true;
  }

  updateOtp(otp: string) {
    this.otpModalShow = false;
    let mobile = (this.userService.userProfile.basicProfileInfo.primaryPhoneNo) ? (this.userService.userProfile.basicProfileInfo.primaryPhoneNo) : this.auth.user.phoneNumber;
    this.isLoading = true;
    this.userService.updateNewsletterPreference(mobile, otp, 
      this.userService.userProfile.basicProfileInfo.isSubscribedForNewsletter,
      this.userService.userProfile.basicProfileInfo.isSubscribedForLearningAcademy,
      this.userService.userProfile.basicProfileInfo.isSubscribedForSecondaryCareer
      ).subscribe(res => {
      this.isLoading = false;
      this.isLetterEditDisabled = true;
      try { this.newsLetterSubscriptionStatus = JSON.parse(this.userService.userProfile.basicProfileInfo.isSubscribedForNewsletter + "".toLowerCase()); } catch (e) { console.warn(e) }
    }, err => this.isLoading = false);
  }

}
