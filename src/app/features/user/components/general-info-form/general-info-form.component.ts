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
      day: [''],
      month: [''],
      year: [''],
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
    if (this.isDateValid) {
      // let userInfo: UserProfile = {
      //   individualInfo: this.generalInfoForm.value
      // };
      // userInfo.individualInfo.dob = new Date(inputDate);
      // console.log(userInfo);
      this.userService.userProfile.individualInfo.gender = this.formControl.gender.value;
      this.userService.userProfile.individualInfo.maritalStatus = this.formControl.maritalStatus.value;
      this.userService.userProfile.individualInfo.occupation = this.formControl.occupation.value;
      this.userService.userProfile.individualInfo.dob = new Date(inputDate);
      console.log(this.userService.userProfile);
      this.userService.updateUserProfile(this.userService.userProfile).subscribe(
        response => {
          console.log(response);
        });
    }
  }

}
