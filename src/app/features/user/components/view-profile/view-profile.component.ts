import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core';
import { Gender, monthOptions } from 'src/app/core/interfaces';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal-component';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();

  gender: string;
  messages: any;
  subscription: Subscription;
  dob: string;
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.gender = Object.keys(Gender).find(key => Gender[key] === this.userService.userProfile.individualInfo.gender);

    const month = `${this.userService.userProfile.individualInfo.dob.split("-")[0] ? monthOptions.find(month => month.value === +this.userService.userProfile.individualInfo.dob.split("-")[0]).name : ' '}`;
    const day = `${this.userService.userProfile.individualInfo.dob.split("-")[1] ? this.userService.userProfile.individualInfo.dob.split("-")[1] : ' '}`;
    const year = `${this.userService.userProfile.individualInfo.dob.split("-")[2] ? this.userService.userProfile.individualInfo.dob.split("-")[2] : ' '}`;

    this.dob = `${month} ${day} ${year}`;
  }

  edit(actionName) {
    // console.log('edit')
    this.editProfile.emit({ obj: "", action: actionName });
  }
}
