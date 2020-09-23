import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile, UserIdType } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-info-form',
  templateUrl: './additional-info-form.component.html',
  styleUrls: ['./additional-info-form.component.scss']
})
export class AdditionalInfoFormComponent implements OnInit {

  @Input() verifiedString: string;
  @Output() doNotRegister = new EventEmitter();
  
  //FOR MERGING ACCOUNTS
  isMergeRequired:any = false;
  showMergeModel = false
  oldAccountDetails: UserProfile;

  //Temp user Profile image Url
  userImages: string[] = [
    "/assets/images/user/JOA Symbol Grayscale RGB.svg",
    "/assets/images/user/JOA Symbol Outline Color RGB.svg",
    "/assets/images/user/JOA Title WO Tagline Dark RGB.svg"
  ]
  // userform: FormGroup;
  userform = this.fb.group({
    firstName: [{ value: this.auth.user.email ? this.auth.user.userName : '', disabled: !!this.auth.user.email }, Validators.required],
    primaryEmail: [this.auth.user.email, Validators.email],
    primaryPhoneNo: [this.auth.user.phoneNumber],
  });
  userIdType = UserIdType;
  errorMessage: string;
  get formControl() {
    return this.userform.controls;
  }

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userform.get("firstName").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.userform.get("primaryEmail").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.userform.get("primaryPhoneNo").valueChanges.subscribe(selectedValue => {
      if (selectedValue) {
        const phoneNumber = selectedValue.toString();
        if (phoneNumber.length > 10) {
          this.formControl.primaryPhoneNo.setValue(phoneNumber.slice(0, 10));
        }
      }
      this.userService.formEditMessage("editForm")
    });
  }

  onSubmit() {
    if (this.auth.user.userIdType === this.userIdType.MOBILE) {
      this.userService.validateEmailPresence(this.userform.get('primaryEmail').value).subscribe(
        res => {
          if (res.data != false) {
            this.oldAccountDetails = res.data;
            this.showMergeModel = true;
          } else {
            this.proceedSignup()
          }
        }
      )
    } else {
      this.userService.validatePhoneNumberPresence(this.userform.get('primaryPhoneNo').value).subscribe(
        res => {
          if (res.data != false) {
            this.oldAccountDetails = res.data;
            this.showMergeModel = true;
          } else {
            this.proceedSignup()
          }
        }
      )
    }
  }

  proceedSignup() {
    this.errorMessage = null;
    if (this.userform.valid && this.mobileValidation()) {
      let userData: UserProfile = {
        basicProfileInfo: {
          profileImage: {
            thumbnailImage: this.userImages[Math.floor(Math.random() * this.userImages.length)]
          },
          ...this.userform.getRawValue()
        }

      };
      if (this.auth.user && this.auth.user.id) {
        userData.userId = this.auth.user.id;
        this.userService.createUserProfile(userData).subscribe(
          response => {
            if (response) {
              if (this.isMergeRequired != false) {
                this.userService.mergeAccounts(response.userId, this.oldAccountDetails.id, this.isMergeRequired.isRetrieveOldAccountInfo).subscribe(res => {
                  this.redirectAfterSignup();
                })
              } else {
                this.redirectAfterSignup();
              }
            }
          },
          error => {
            console.log(error);
            error.error.error ? this.errorMessage = error.error.error.errorMsg : this.errorMessage = "Something went wrong!";
          });
      } else {
        this.auth.registerUser(userData).subscribe(
          response => {
            if (response) {
              if (this.isMergeRequired != false) {
                this.userService.mergeAccounts(response.userId, this.oldAccountDetails.id, this.isMergeRequired.isRetrieveOldAccountInfo).subscribe(res => {
                  this.redirectAfterSignup();
                })
              } else {
                this.redirectAfterSignup();
              }
            }
          },
          error => {
            console.log(error);
            error.error.error ? this.errorMessage = error.error.error.errorMsg : this.errorMessage = "Something went wrong!";
          });
      }

    } else {
      this.errorMessage = "Please enter a valid mobile number";
    }
  }

  redirectAfterSignup() {
    if (this.auth.redirectUrl) {
      const redirect = this.auth.redirectUrl;
      this.auth.removeRedirectUrl();
      this.router.navigateByUrl(redirect);
    } else {
      this.router.navigateByUrl("/");
    }
  }

  notToRegister() {
    this.doNotRegister.emit();
  }

  mobileValidation(): boolean {
    if (this.formControl.primaryPhoneNo.value && this.formControl.primaryPhoneNo.value.toString().length !== 10) {
      return false
    }
    return true;
  }

}
