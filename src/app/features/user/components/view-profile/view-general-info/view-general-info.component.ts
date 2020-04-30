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
  // beforeModalEdit:any;
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      this.messages=message;
      // this.editForm(this.beforeModalEdit)
    });
    // this.subscription=this.userService.geteditFormSection().subscribe(res=>{
    //   if(res==="editSection"){
    //     this.editProfile.emit({obj: "", action: this.beforeModalEdit})
    //   }
    // })
  }

  edit(actionName){
    // console.log('edit on view')
    if(this.messages=='editForm'){
      // this.beforeModalEdit=actionName;
      // console.log(this.beforeModalEdit);
      const modalRef = this.modalService.open(ModalComponent);
    }else{
      this.editProfile.emit({obj: "", action: actionName})
    }
  }
}
