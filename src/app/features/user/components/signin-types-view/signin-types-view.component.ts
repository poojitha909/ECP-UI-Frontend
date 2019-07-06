import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin-types-view',
  templateUrl: './signin-types-view.component.html',
  styleUrls: ['./signin-types-view.component.scss']
})
export class SigninTypesViewComponent implements OnInit {

  verifyPhoneForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.verifyPhoneForm = this.fb.group({
      phoneNumber: [""],
      otp: [""]
    })
  }

  ngOnInit() {
  }

}
