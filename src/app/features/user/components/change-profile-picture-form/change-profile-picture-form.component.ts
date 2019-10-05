import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-profile-picture-form',
  templateUrl: './change-profile-picture-form.component.html',
  styleUrls: ['./change-profile-picture-form.component.scss']
})
export class ChangeProfilePictureFormComponent implements OnInit {

  basicProfile: FormGroup;
  errorMessage;
  successMessage;
  isLoading;

  constructor(
    private auth: AuthService,
    public userService: UserService,
    public fb: FormBuilder
  ) {

    this.basicProfile = this.fb.group({
      firstName: [this.userService.userProfile.basicProfileInfo.firstName || '', Validators.required],
      primaryEmail: [this.userService.userProfile.basicProfileInfo.primaryEmail || '', Validators.required],
      primaryPhoneNo: [this.userService.userProfile.basicProfileInfo.primaryPhoneNo || '', Validators.required],

    });

  }

  ngOnInit() {
  }

  get formControl() {
    return this.basicProfile.controls;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append('images', file);
      formData.append("name", "new");
      formData.append("description", "test");
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported.");
        return;
      }

      console.log(formData.getAll);

      this.userService.uploadUserImage(formData).subscribe(
        response => {
          console.log(response);
        })
    }
  }

  onSubmit() {
    this.userService.userProfile.basicProfileInfo.firstName = this.formControl.firstName.value;
    this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
    this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
    this.isLoading = true;
    this.resetAlertMessages();

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
  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}
