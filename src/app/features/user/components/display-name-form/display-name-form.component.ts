import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-display-name-form',
  templateUrl: './display-name-form.component.html',
  styleUrls: ['./display-name-form.component.scss']
})
export class DisplayNameFormComponent implements OnInit {
  userForm: FormGroup;
  errorMessage;
  successMessage;
  isLoading;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService
  ) {

    this.userForm = this.fb.group({
      userName: [this.auth.user.userName || '', Validators.required],
      id: [this.auth.user.id, Validators.required]
    });
  }

  get formControl() {
    return this.userForm.controls;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.resetAlertMessages();
      this.userService.changeUserName(this.userForm.value).subscribe(
        response => {
          this.isLoading = false;
          this.successMessage = "User name updated successfully"
          // this.router.navigateByUrl("/");
        },
        error => {
          this.isLoading = false;
          this.errorMessage = "Some unknown internal server error occured";
          console.log(error);
        })
    }
  }

  resetAlertMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}
