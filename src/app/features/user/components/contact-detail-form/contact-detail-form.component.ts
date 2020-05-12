import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styleUrls: ['./contact-detail-form.component.scss']
})
export class ContactDetailFormComponent implements OnInit {

  @Output() cancelForm = new EventEmitter();
  contactForm: FormGroup;
  errorMessage;
  successMessage;
  isLoading;
  subscription: Subscription;
  otpModalShow = false;
  otpMobile: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.contactForm = this.fb.group({
      // primaryEmail: [this.userService.userProfile.basicProfileInfo.primaryEmail || '', Validators.required],
      // primaryPhoneNo: [this.userService.userProfile.basicProfileInfo.primaryPhoneNo || '', Validators.required],
      city: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.city || 'Hyderabad'],
      // country: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.country || 'India'],
      streetAddress: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress || ''],
      zip: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip || '', [Validators.pattern("^[0-9]{6}$"), Validators.maxLength(6)]]
    });
    this.otpMobile = this.userService.userProfile.basicProfileInfo.primaryPhoneNo ?
      this.userService.userProfile.basicProfileInfo.primaryPhoneNo :
      this.auth.user.phoneNumber;

  }

  get formControl() {
    return this.contactForm.controls;
  }

  ngOnInit() {
    this.contactForm.get("streetAddress").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.contactForm.get("zip").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.contactForm.get("city").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    })
    this.subscription = this.userService.getFormEditMessage().subscribe(message => {
      if (message == "closeModal") {
        document.getElementById("city").focus();
      }
    })
  }

  showOtpModal() {
    this.otpModalShow = true;
  }
  updateOtp(otp: string) {
    this.otpModalShow = false;
    this.userService.userProfile.otp = otp;
    if (otp != "") {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const oldUserData = {
        city: this.userService.userProfile.basicProfileInfo.primaryUserAddress.city,
        streetAddress: this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress,
        zip: this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip
      };
      // this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
      // this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.city = this.formControl.city.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.country = 'India'
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress = this.formControl.streetAddress.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip = this.formControl.zip.value;
      this.isLoading = true;
      this.resetAlertMessages();

      this.userService.updateUserProfile(this.userService.userProfile).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = "User contact information updated successfully"
          this.cancelForm.emit();
        },
        error => {
          this.isLoading = false;

          this.userService.userProfile.basicProfileInfo.primaryUserAddress.city = oldUserData.city;
          this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress = oldUserData.streetAddress;
          this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip = oldUserData.zip;
          if (error.error.error.errorCode == 3001) {
            this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
          } else if (error.error.error.errorCode == 3004) {
            this.errorMessage = error.error.error.errorMsg;
          } else {
            this.errorMessage = "Some unknown internal server error occurred";
          }
        });
    }
    // this.userService.editFormSection('editSection')
  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  onCancel() {
    this.resetAlertMessages();
    this.cancelForm.emit();
  }

}
