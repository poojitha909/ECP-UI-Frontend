import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styleUrls: ['./contact-detail-form.component.scss']
})
export class ContactDetailFormComponent implements OnInit {

  contactForm: FormGroup;
  errorMessage;
  successMessage;
  isLoading;


  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.contactForm = this.fb.group({
      primaryEmail: [this.userService.userProfile.basicProfileInfo.primaryEmail || '', Validators.required],
      primaryPhoneNo: [this.userService.userProfile.basicProfileInfo.primaryPhoneNo || '', Validators.required],
      city: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.city || ''],
      country: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.country || ''],
      streetAddress: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress || ''],
      zip: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip || '']
    });

  }

  get formControl() {
    return this.contactForm.controls;
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
      this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.city = this.formControl.city.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.country = this.formControl.country.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress = this.formControl.streetAddress.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip = this.formControl.zip.value;
      this.isLoading = true;
      this.resetAlertMessages();

      this.userService.updateUserProfile(this.userService.userProfile).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = "User contact information updated successfully"
          console.log(response);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = "Some unknown internal server error occured";
        });
    }

  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}
