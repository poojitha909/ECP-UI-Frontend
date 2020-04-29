import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Gender } from 'src/app/core/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../modal-component';

@Component({
  selector: 'app-view-general-info',
  templateUrl: './view-general-info.component.html',
  styleUrls: ['./view-general-info.component.scss']
})
export class ViewGeneralInfoComponent implements OnInit {
  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();
  
  messages:any;
  subscription: Subscription;
  gender: string;
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      this.messages=message;
     
    })
  }

  edit(actionName){
    if(this.messages=='editForm'){
      const modalRef = this.modalService.open(ModalComponent);
    }else{
      this.editProfile.emit({obj: "", action: actionName})
    }
  }
}
