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
    firstName: ['', Validators.required],
    email: [this.auth.user.email],
    phoneNumber: [this.auth.user.phoneNumber],
    gender: ['', Validators.required]
  });
  userIdType = UserIdType;

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

  }

  onSubmit() {
    if (this.userform.valid) {

      let userData: UserProfile = {
        userId: this.auth.user.id,
        basicProfileInfo: {
          firstName: this.userform.controls.firstName.value,
          primaryEmail:this.userform.controls.email.value,
          primaryPhoneNo:this.userform.controls.phoneNumber.value
        },
        individualInfo: {
          gender: +this.userform.controls.gender.value
        }
      };

      this.userService.createUserProfile(userData).subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl("/");
        },
        error => {
          console.log(error);
        })
      console.log(userData);

    }
  }

}
