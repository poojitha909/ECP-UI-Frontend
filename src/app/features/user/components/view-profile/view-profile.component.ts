import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core';
import { Gender } from 'src/app/core/interfaces';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  @Output() editProfile = new EventEmitter();

  gender: string;

  constructor(
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {

    this.gender = Object.keys(Gender).find(key => Gender[key] === this.userService.userProfile.individualInfo.gender);
    console.log(this.gender);
  }

  edit() {
    this.editProfile.emit();
  }

}
