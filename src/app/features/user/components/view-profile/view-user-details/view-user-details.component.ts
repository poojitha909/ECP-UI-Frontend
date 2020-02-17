import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.scss']
})
export class ViewUserDetailsComponent implements OnInit {


  constructor(
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }
  edit(event){
    alert("Please Submit or Cancel before edit");
    console.log('modal_userDetails')
   
  }
}