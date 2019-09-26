import { Component, OnInit, Input } from '@angular/core';
import { User, monthOptions, IndividualInfo, UserProfile } from 'src/app/core/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss']
})
export class GeneralInfoFormComponent implements OnInit {

  errorMessage;
  successMessage;
  isLoading;

  dateOption: number[] = Array.from({ length: 31 }, (v, k) => k + 1);
  monthOption: any[] = monthOptions;
  yearOptions: number[] = Array.from({ length: 100 }, (n, k) => {
    let currenctYear = new Date().getFullYear() - 1;
    return currenctYear - k;
  });

  isDateValid: boolean;

  generalInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.generalInfoForm = this.fb.group({
      gender: [this.userService.userProfile.individualInfo.gender || 0],
      maritalStatus: [this.userService.userProfile.individualInfo.maritalStatus || 'Married'],
      day: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getDate() : ''],
      month: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getMonth() : ''],
      year: [this.userService.userProfile.individualInfo.dob ? new Date(this.userService.userProfile.individualInfo.dob).getFullYear() : ''],
      occupation: [this.userService.userProfile.individualInfo.occupation || '']
    });

  }

  get formControl() {
    return this.generalInfoForm.controls;
  }

  ngOnInit() {

  }

  onSubmit() {

    const inputDate: string = `${this.formControl.month.value}-${this.formControl.day.value}-${this.formControl.year.value}`;
    this.isDateValid = this.userService.validateDate(inputDate);
    console.log(this.isDateValid);
    this.resetAlertMessages();
    if (this.isDateValid) {
      this.userService.userProfile.individualInfo.gender = this.formControl.gender.value;
      this.userService.userProfile.individualInfo.maritalStatus = this.formControl.maritalStatus.value;
      this.userService.userProfile.individualInfo.occupation = this.formControl.occupation.value;
      this.userService.userProfile.individualInfo.dob = new Date(inputDate);
      console.log(this.userService.userProfile);
      this.isLoading = true;
      this.userService.updateUserProfile(this.userService.userProfile).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = "User information updated successfully"
          console.log(response);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = "Some unknown internal server error occured";
        });
    } else {
      this.errorMessage = "Invalid DOB";
    }
  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}