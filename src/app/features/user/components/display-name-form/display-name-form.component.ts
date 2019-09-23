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

  ngOnInit() {
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.changeUserName(this.userForm.value).subscribe(
        response => {
          console.log(response);
          // this.router.navigateByUrl("/");
        },
        error => {
          console.log(error);
        })
    }
  }

}
