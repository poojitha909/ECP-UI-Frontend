import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-view-personal-information',
  templateUrl: './view-personal-information.component.html',
  styleUrls: ['./view-personal-information.component.scss']
})
export class ViewPersonalInformationComponent implements OnInit {

  constructor(
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
