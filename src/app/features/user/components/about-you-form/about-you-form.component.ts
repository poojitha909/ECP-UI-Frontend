import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-about-you-form',
  templateUrl: './about-you-form.component.html',
  styleUrls: ['./about-you-form.component.scss']
})
export class AboutYouFormComponent implements OnInit {

  aboutForm: FormGroup;
  medicalIssues: string[] = ["Diabetes", "Blood", "Pressure", "Dementia", "Arthiritis"];
  hobbies: string[] = [
    "Sports",
    "Music",
    "Playing",
    "Listening",
    "Traveling",
    "Socializing",
    "Community-work",
    "Volunteer-Work",
    "Painting",
    "Dancing",
    "Reading", "Writing"
  ];

  emotionalChallenges: string[] = [
    "Depression",
    "Mental health issues",
    "No Challenges"
  ];

  otherDifficulties: string[] = [
    "Mobility Issues",
    "Hearing Problems",
    "Speech",
    "No Difficulties"
  ];

  languages: any[] = [
    {
      id: 1,
      name: 'Telugu'
    },
    {
      id: 2,
      name: 'English'
    },
    {
      id: 3,
      name: 'Hindi'
    },
    {
      id: 4,
      name: 'Tamil'
    },
    {
      id: 5,
      name: 'Urdu'
    },
    {
      id: 6,
      name: 'Others'
    }
  ];

  errorMessage;
  successMessage;
  isLoading;


  constructor(
    private fb: FormBuilder,
    private userService: UserService) {

    this.aboutForm = this.fb.group({
      shortDescription: [this.userService.userProfile.basicProfileInfo.shortDescription || ''],
      emotionalIssues: [this.userService.userProfile.individualInfo.emotionalIssues || ''],
      medicalIssues: [this.userService.userProfile.individualInfo.medicalIssues || null],
      otherIssues: [this.userService.userProfile.individualInfo.otherIssues || ''],
      language: [this.userService.userProfile.individualInfo.language || '', Validators.required],
      hobbies: [this.userService.userProfile.individualInfo.hobbies || null],
      otherInterests: [this.userService.userProfile.individualInfo.otherInterests || '']
    });
  }

  get formControl() {
    return this.aboutForm.controls;
  }

  ngOnInit() {
  }

  addTagFn(name) {
    return name;
  }

  addLangFn(name) {
    return { id: 0, name: name };
  }

  onSubmit() {
    if (this.aboutForm.valid) {
      this.formControl.language.value.forEach(
        (val, index) => {
          val.id = index + 1;
        });
      console.log(this.aboutForm.value);

      this.userService.userProfile.basicProfileInfo.shortDescription = this.formControl.shortDescription.value;
      this.userService.userProfile.individualInfo.emotionalIssues = this.formControl.emotionalIssues.value;
      this.userService.userProfile.individualInfo.medicalIssues = this.formControl.medicalIssues.value;
      this.userService.userProfile.individualInfo.otherIssues = this.formControl.otherIssues.value;
      this.userService.userProfile.individualInfo.language = this.formControl.language.value;
      this.userService.userProfile.individualInfo.hobbies = this.formControl.hobbies.value;
      this.userService.userProfile.individualInfo.otherInterests = this.formControl.otherInterests.value;

      this.isLoading = true;
      this.resetAlertMessages();

      this.userService.updateUserProfile(this.userService.userProfile).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = "User personal information updated successfully"
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
