import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-you-form',
  templateUrl: './about-you-form.component.html',
  styleUrls: ['./about-you-form.component.scss']
})
export class AboutYouFormComponent implements OnInit {
  @Output() cancelForm = new EventEmitter();
  otpModalShow = false;
  otpMobile: string;
  aboutForm: FormGroup;
  medicalIssues: string[] = ["Diabetes", "Blood Pressure", "Dementia", "Arthiritis", "Others"];
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
  subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private userService: UserService) {

    this.aboutForm = this.fb.group({
      shortDescription: [this.userService.userProfile.basicProfileInfo.shortDescription || ''],
      emotionalIssues: [this.userService.userProfile.individualInfo.emotionalIssues || null],
      medicalIssues: [this.userService.userProfile.individualInfo.medicalIssues || null],
      otherIssues: [this.userService.userProfile.individualInfo.otherIssues || null],
      language: [this.userService.userProfile.individualInfo.language || null, Validators.required],
      hobbies: [this.userService.userProfile.individualInfo.hobbies || null],
      otherInterests: [this.userService.userProfile.individualInfo.otherInterests || null]
    });
    this.otpMobile = this.userService.userProfile.basicProfileInfo.primaryPhoneNo;
  }

  get formControl() {
    return this.aboutForm.controls;
  }

  ngOnInit() {
    this.aboutForm.get("shortDescription").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("emotionalIssues").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("medicalIssues").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("otherIssues").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("language").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("hobbies").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.aboutForm.get("otherInterests").valueChanges.subscribe(selectedValue => {
      this.userService.formEditMessage("editForm")
    });
    this.subscription = this.userService.getFormEditMessage().subscribe(message => {
      if (message == "closeModal") {
        document.getElementById("about-you").focus();
      }
    })


  }

  addTagFn(name) {
    return name;
  }

  addLangFn(name) {
    return { id: 0, name: name };
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
    // this.userService.editFormSection('editSection')
    if (this.aboutForm.valid) {
      this.formControl.language.value.forEach(
        (val, index) => {
          val.id = index + 1;
        });

      const oldUserData = {
        shortDescription: this.userService.userProfile.basicProfileInfo.shortDescription,
        emotionalIssues: this.userService.userProfile.individualInfo.emotionalIssues,
        medicalIssues: this.userService.userProfile.individualInfo.medicalIssues,
        otherIssues: this.userService.userProfile.individualInfo.otherIssues,
        language: this.userService.userProfile.individualInfo.language,
        hobbies: this.userService.userProfile.individualInfo.hobbies,
        otherInterests: this.userService.userProfile.individualInfo.otherInterests
      };

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
          this.successMessage = "User personal information updated successfully";
          this.cancelForm.emit();
        },
        error => {
          this.isLoading = false;
          this.userService.userProfile.basicProfileInfo.shortDescription = oldUserData.shortDescription
          this.userService.userProfile.individualInfo.emotionalIssues = oldUserData.emotionalIssues;
          this.userService.userProfile.individualInfo.medicalIssues = oldUserData.medicalIssues;
          this.userService.userProfile.individualInfo.otherIssues = oldUserData.otherIssues;
          this.userService.userProfile.individualInfo.language = oldUserData.language;
          this.userService.userProfile.individualInfo.hobbies = oldUserData.hobbies;
          this.userService.userProfile.individualInfo.otherInterests = oldUserData.otherInterests;
          if (error.error.error.errorCode == 3001) {
            this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
          } else if (error.error.error.errorCode == 3004) {
            this.errorMessage = error.error.error.errorMsg;
          } else {
            this.errorMessage = "Some unknown internal server error occurred";
          }
        });
    }

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
