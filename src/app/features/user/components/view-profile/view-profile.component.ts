import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core';
import { Gender } from 'src/app/core/interfaces';
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
  messages:any;
  subscription: Subscription;
  
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.gender = Object.keys(Gender).find(key => Gender[key] === this.userService.userProfile.individualInfo.gender);
    console.log(this.gender);
  }

  edit(actionName) {
    this.editProfile.emit({ obj: "", action: actionName });
  }
}
