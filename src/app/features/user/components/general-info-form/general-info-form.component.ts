import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, monthOptions, IndividualInfo, UserProfile } from 'src/app/core/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss']
})
export class GeneralInfoFormComponent implements OnInit {

  @Output() cancelForm = new EventEmitter();

  errorMessage;
  successMessage;
  isLoading;
  subscription: Subscription;
  otpModalShow = false;
  otpMobile: string

  dateOption: number[] = Array.from({ length: 31 }, (v, k) => k + 1);
  monthOption: any[] = monthOptions;
  yearOptions: number[] = Array.from({ length: 100 }, (n, k) => {
    let currenctYear = new Date().getFullYear() - 1;
    return currenctYear - k;
  });

  isDateValid: boolean;

  generalInfoForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.generalInfoForm = this.fb.group({
      gender: [this.userService.userProfile.individualInfo.gender || 0],
      maritalStatus: [this.userService.userProfile.individualInfo.maritalStatus || 'Married'],
      day: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getDate() : ''],
      month: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getMonth() + 1 : ''],
      year: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getFullYear() : ''],
      occupation: [this.userService.userProfile.individualInfo.occupation || '']
    });
    this.otpMobile = this.auth.user.phoneNumber;
  }

  get formControl() {
    return this.generalInfoForm.controls;
  }

  ngOnInit() {
    this.generalInfoForm.get("gender").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.generalInfoForm.get("maritalStatus").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.generalInfoForm.get("occupation").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.generalInfoForm.get("day").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.generalInfoForm.get("month").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.generalInfoForm.get("year").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.subscription = this.userService.getFormEditMessage().subscribe(message => {
      if (message == "closeModal") {
        document.getElementById("Year").focus();
      }
    })
  }

  showOtpModal() {
    const inputDate: string = `${this.formControl.month.value}-${this.formControl.day.value}-${this.formControl.year.value}`;
    this.isDateValid = this.userService.validateDate(inputDate);
    this.resetAlertMessages();
    if (this.isDateValid) {
      this.otpModalShow = true;
    } else {
      this.errorMessage = "Selected Date of Birth is invalid, Please select a correct date";
    }
  }
  updateOtp(otp: string) {
    this.otpModalShow = false;
    this.userService.userProfile.otp = otp;
    if (otp != "") {
      this.onSubmit();
    }
  }

  onSubmit() {
    const inputDate: string = `${this.formControl.month.value}-${this.formControl.day.value}-${this.formControl.year.value}`;
    const oldUserData = {
      gender: this.userService.userProfile.individualInfo.gender,
      maritalStatus: this.userService.userProfile.individualInfo.maritalStatus,
      occupation: this.userService.userProfile.individualInfo.occupation,
      dob: this.userService.userProfile.individualInfo.dob
    };

    this.userService.userProfile.individualInfo.gender = this.formControl.gender.value;
    this.userService.userProfile.individualInfo.maritalStatus = this.formControl.maritalStatus.value;
    this.userService.userProfile.individualInfo.occupation = this.formControl.occupation.value;
    this.userService.userProfile.individualInfo.dob = new Date(inputDate);
    this.isLoading = true;
    this.userService.updateUserProfile(this.userService.userProfile).subscribe(
      response => {
        this.isLoading = false;
        this.successMessage = "User information updated successfully"
        this.cancelForm.emit();
      },
      error => {
        this.isLoading = false;
        this.userService.userProfile.individualInfo.gender = oldUserData.gender;
        this.userService.userProfile.individualInfo.maritalStatus = oldUserData.maritalStatus;
        this.userService.userProfile.individualInfo.occupation = oldUserData.occupation;
        this.userService.userProfile.individualInfo.dob = oldUserData.dob;
        if (error.error.error.errorCode == 3001) {
          this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
        } else if (error.error.error.errorCode == 3004) {
          this.errorMessage = error.error.error.errorMsg;
        } else {
          this.errorMessage = "Some unknown internal server error occurred";
        }
      });
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
