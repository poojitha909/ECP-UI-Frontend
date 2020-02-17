import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Gender } from 'src/app/core/interfaces';

@Component({
  selector: 'app-view-general-info',
  templateUrl: './view-general-info.component.html',
  styleUrls: ['./view-general-info.component.scss']
})
export class ViewGeneralInfoComponent implements OnInit {

  
  
  gender: string;
  constructor(
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.gender = Object.keys(Gender).find(key => Gender[key] === this.userService.userProfile.individualInfo.gender);
    console.log(this.gender);
  }

  edit(modal_general){
    alert("Please Submit or Cancel before edit");
    console.log('modal_general')
    
  }
}
