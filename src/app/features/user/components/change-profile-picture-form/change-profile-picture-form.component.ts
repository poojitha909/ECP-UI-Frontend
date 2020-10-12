import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/core/interfaces';

@Component({
  selector: 'app-change-profile-picture-form',
  templateUrl: './change-profile-picture-form.component.html',
  styleUrls: ['./change-profile-picture-form.component.scss']
})
export class ChangeProfilePictureFormComponent implements OnInit {

  @Output() cancelForm = new EventEmitter();
  otpModalShow = false;
  otpMobile: string;
  EditUser: string;
  eventEmitted: any;
  imageData: FormData;

  profileImage;
  basicProfile: FormGroup;
  errorMessage;
  successMessage;
  isLoading;
  subscription: Subscription;

  //FOR MERGING ACCOUNTS
  isMergeRequired: any = false;
  showMergeModel = false
  oldAccountDetails: UserProfile;
  newAccountDetails = { firstName: "", primaryPhoneNo: "", primaryEmail: "" }
  mergePopupTypeisMobile = true

  static defaultUserDetails = {
    firstname: "",
    phoneNumber: "",
    email: ""
  }

  constructor(
    private auth: AuthService,
    public userService: UserService,
    public fb: FormBuilder
  ) {

    this.basicProfile = this.fb.group({
      firstName: [this.userService.userProfile.basicProfileInfo.firstName || '', Validators.required],
      primaryEmail: [this.userService.userProfile.basicProfileInfo.primaryEmail || '', [Validators.required, Validators.email]],
      primaryPhoneNo: [this.userService.userProfile.basicProfileInfo.primaryPhoneNo || '', Validators.required],

    });

    if (this.userService.userProfile.basicProfileInfo.profileImage && this.userService.userProfile.basicProfileInfo.profileImage.thumbnailImage) {
      this.profileImage = this.userService.userProfile.basicProfileInfo.profileImage.thumbnailImage;
      //old details
      ChangeProfilePictureFormComponent.defaultUserDetails.firstname = this.userService.userProfile.basicProfileInfo.firstName;
      ChangeProfilePictureFormComponent.defaultUserDetails.email = this.userService.userProfile.basicProfileInfo.primaryEmail;
      ChangeProfilePictureFormComponent.defaultUserDetails.phoneNumber = this.userService.userProfile.basicProfileInfo.primaryPhoneNo;
      console.log(this.userService.userProfile.userId)
      console.log(this.userService.userProfile.basicProfileInfo.primaryEmail)
      console.log(this.userService.userProfile.basicProfileInfo.primaryPhoneNo)
    }
    this.otpMobile = this.auth.user.phoneNumber || this.auth.user.email;
  }

  ngOnInit() {
    this.basicProfile.get("firstName").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.basicProfile.get("primaryEmail").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.basicProfile.get("primaryPhoneNo").valueChanges.subscribe(selectedValue => {
      if (selectedValue) {
        const phoneNumber = selectedValue.toString();
        if (phoneNumber.length > 10) {
          this.formControl.primaryPhoneNo.setValue(phoneNumber.slice(0, 10));
        }
      }
      this.userService.formEditMessage("editForm")
    });
    this.subscription = this.userService.getFormEditMessage().subscribe(message => {
      if (message == "closeModal") {
        document.getElementById("Phone-number").focus();
      }
    })
  }


  get formControl() {
    return this.basicProfile.controls;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.imageData = new FormData();
      this.imageData.append('images', file);
      this.imageData.append("name", "new");
      this.imageData.append("description", "test");
      const cur = this;
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        cur.profileImage = ev.target.result;;
      };
      reader.readAsDataURL(file);
      // const mimeType = file.type;
      // if (mimeType.match(/image\/*/) == null) {
      //   alert("Only images are supported.");
      //   return;
      // }
      // console.log(file);
      // console.log(this.imageData.getAll);
      // console.log(reader.readAsDataURL(file));
    }
    // console.log(this.profileImage);
  }

  showOtpModal() {
    this.otpModalShow = true;
  }
  updateOtp(otp: string) {
    this.userService.userProfile.otp = otp;
    this.otpModalShow = false;
    if (otp != "") {
      this.onSubmit('SUBMIT_USER_DETAILS');
    }
  }
  onSubmit(event) {

    this.newAccountDetails.firstName = ChangeProfilePictureFormComponent.defaultUserDetails.firstname;
    this.newAccountDetails.primaryEmail = ChangeProfilePictureFormComponent.defaultUserDetails.email;
    this.newAccountDetails.primaryPhoneNo = ChangeProfilePictureFormComponent.defaultUserDetails.phoneNumber;

    if (this.mobileValidation()) {
      if (this.formControl.primaryEmail.value != ChangeProfilePictureFormComponent.defaultUserDetails.email) {
        this.mergePopupTypeisMobile = true
        this.userService.validateEmailPresenceForUpdate(this.userService.userProfile.userId,
          this.formControl.primaryEmail.value).subscribe(
            res => {
              if (res.data != false) {
                this.oldAccountDetails = res.data;
                this.showMergeModel = true;
              } else {
                this.proceedUpdate(event);
              }
            }
          )
      } else if (this.formControl.primaryPhoneNo.value != ChangeProfilePictureFormComponent.defaultUserDetails.phoneNumber) {
        this.mergePopupTypeisMobile = false
        this.userService.validatePhoneNumberPresenceForUpdate(this.userService.userProfile.userId,
          this.formControl.primaryPhoneNo.value).subscribe(
            res => {
              if (res.data != false) {
                this.oldAccountDetails = res.data;
                this.showMergeModel = true;
              } else {
                this.proceedUpdate(event);
              }
            }
          )
      } else {
        this.proceedUpdate(event);
      }
    }
  }

  proceedUpdate(event) {
    // this.userService.editFormSection('editSection')
    if (this.mobileValidation()) {
      const oldUserData = {
        firstName: this.userService.userProfile.basicProfileInfo.firstName,
        primaryEmail: this.userService.userProfile.basicProfileInfo.primaryEmail,
        primaryPhoneNo: this.userService.userProfile.basicProfileInfo.primaryPhoneNo
      };

      this.userService.userProfile.basicProfileInfo.firstName = this.formControl.firstName.value;
      if(this.isMergeRequired != false){
        this.userService.userProfile.basicProfileInfo.primaryEmail = ChangeProfilePictureFormComponent.defaultUserDetails.email;
        this.userService.userProfile.basicProfileInfo.primaryPhoneNo = ChangeProfilePictureFormComponent.defaultUserDetails.phoneNumber;
      }else{
      this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
      this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
      }
      
      this.isLoading = true;
      this.resetAlertMessages();

      this.userService.uploadUserImage(this.imageData).subscribe(
        response => {

          if (this.isMergeRequired != false) {
            this.userService.mergeAccounts(response.userId, this.oldAccountDetails.id, this.isMergeRequired.isRetrieveOldAccountInfo).subscribe(res => {
              this.isLoading = false;
              this.successMessage = "User information updated successfully";
              this.cancelForm.emit();
              location.reload();
            })
          } else {
            this.isLoading = false;
            this.successMessage = "User information updated successfully";
            this.cancelForm.emit();
          }
        },
        error => {
          this.isLoading = false;
          console.log(error);
          this.userService.userProfile.basicProfileInfo.firstName = oldUserData.firstName;
          this.userService.userProfile.basicProfileInfo.primaryEmail = oldUserData.primaryEmail;
          this.userService.userProfile.basicProfileInfo.primaryPhoneNo = oldUserData.primaryPhoneNo;

          if (this.imageData) {
            this.errorMessage = "Profile image could not be updated";
          } else {
            if (error.error.error.errorCode == 3001) {
              this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
            } else if (error.error.error.errorCode == 3004) {
              this.errorMessage = error.error.error.errorMsg;
            } else {
              this.errorMessage = "Some unknown internal server error occurred";
            }
          }
        });
    } else {
      this.errorMessage = "Please enter a valid mobile number";
    }
  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  onCancel() {
    this.resetAlertMessages();
    this.cancelForm.emit();
    // this.userService.editFormSection('editSection')
  }

  mobileValidation(): boolean {
    if (this.formControl.primaryPhoneNo.value.toString().length !== 10) {
      return false
    }
    return true;
  }
}
