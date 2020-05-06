import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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

    if(this.userService.userProfile.basicProfileInfo.profileImage && this.userService.userProfile.basicProfileInfo.profileImage.thumbnailImage){
      this.profileImage = this.userService.userProfile.basicProfileInfo.profileImage.thumbnailImage;
    }
    this.otpMobile = this.userService.userProfile.basicProfileInfo.primaryPhoneNo;
  }

  ngOnInit() {
    this.basicProfile.get("firstName").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
     });
     this.basicProfile.get("primaryEmail").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
     });
     this.basicProfile.get("primaryPhoneNo").valueChanges.subscribe(selectedValue=>{
      this.userService.formEditMessage("editForm")
     });
     this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
       if(message=="closeModal"){
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

  showOtpModal(){
    this.otpModalShow=true;
  }
  updateOtp(otp: string){
    this.otpModalShow=false;
    this.userService.userProfile.otp=otp;
    if(otp!=""){
      this.onSubmit('SUBMIT_USER_DETAILS');
    }
  }
  onSubmit(event) {
    // this.userService.editFormSection('editSection')
    this.userService.userProfile.basicProfileInfo.firstName = this.formControl.firstName.value;
    this.userService.userProfile.basicProfileInfo.primaryEmail = this.formControl.primaryEmail.value;
    this.userService.userProfile.basicProfileInfo.primaryPhoneNo = this.formControl.primaryPhoneNo.value;
    this.isLoading = true;
    this.resetAlertMessages();

    this.userService.uploadUserImage(this.imageData).subscribe(
      response => {
        this.isLoading = false;
        this.successMessage = "User information updated successfully"
        this.cancelForm.emit();
        console.log(response);
      },
      error => {
        this.isLoading = false;
        if (this.imageData) {
          this.errorMessage = "Profile image could not be updated";
        } else {
          this.errorMessage = "Some unknown internal server error occurred";
        }
      });
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

}
