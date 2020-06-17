import { Component, OnInit, Input } from '@angular/core';
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
  // userform: FormGroup;
  userform = this.fb.group({
    firstName: [{ value: this.auth.user.email ? this.auth.user.userName : '', disabled: !!this.auth.user.email }, Validators.required],
    primaryEmail: [this.auth.user.email, Validators.email],
    primaryPhoneNo: [this.auth.user.phoneNumber]
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
      this.userService.formEditMessage("editForm")
    });
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.userform.valid) {

      let userData: UserProfile = {
        userId: this.auth.user.id,
        basicProfileInfo: this.userform.value
      };

      this.userService.createUserProfile(userData).subscribe(
        response => {
          if (response) {
            if (this.auth.redirectUrl) {
              const redirect = this.auth.redirectUrl;
              this.auth.removeRedirectUrl();
              this.router.navigateByUrl(redirect);
            } else {
              this.router.navigateByUrl("/");
            }
          }
        },
        error => {
          console.log(error);
          error.error.error ? this.errorMessage = error.error.error.errorMsg : this.errorMessage = "Something went wrong!";
        })
      console.log(userData);

    }
  }

}
