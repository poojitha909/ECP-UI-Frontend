import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

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
  subscription:Subscription;
  otpModalShow = false;
  otpMobile: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
    ) {
    this.contactForm = this.fb.group({
      // primaryEmail: [this.userService.userProfile.basicProfileInfo.primaryEmail || '', Validators.required],
      // primaryPhoneNo: [this.userService.userProfile.basicProfileInfo.primaryPhoneNo || '', Validators.required],
      city: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.city || 'Hyderabad'],
      // country: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.country || 'India'],
      streetAddress: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress || ''],
      zip: [this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip || '']
    });
    this.otpMobile = this.userService.userProfile.basicProfileInfo.primaryPhoneNo;

  }

  get formControl() {
    return this.contactForm.controls;
  }

  ngOnInit() {
    this.contactForm.get("streetAddress").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
    });
    this.contactForm.get("zip").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
    });
    this.contactForm.get("city").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
    })
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      if(message=="closeModal"){
        document.getElementById("city").focus();
        }
    })
  }

  showOtpModal(){
    this.otpModalShow=true;
  }
  updateOtp(otp: string){
    this.otpModalShow=false;
    this.userService.userProfile.otp=otp;
    if(otp!=""){
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      // this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
      // this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.city = this.formControl.city.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.country = 'India'
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.streetAddress = this.formControl.streetAddress.value;
      this.userService.userProfile.basicProfileInfo.primaryUserAddress.zip = this.formControl.zip.value;
      this.userService.userProfile.otp = "";
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
    // this.userService.editFormSection('editSection')
    this.cancelForm.emit();
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
