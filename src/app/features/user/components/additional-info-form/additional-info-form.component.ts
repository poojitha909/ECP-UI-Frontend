import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/core/interfaces';
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
    email: [''],
    gender: ['', Validators.required]
  });

  get formControl() {
    return this.userform.controls;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
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
          firstName: this.userform.controls.firstName.value
        },
        individualInfo: {
          gender: +this.userform.controls.gender.value
        }
      };

      if (this.userform.controls.email.value) {
        userData.basicProfileInfo.primaryEmail = this.userform.controls.email.value;
      }

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
