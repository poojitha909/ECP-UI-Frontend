import { Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal-component';

@Component({
  selector: 'app-view-personal-information',
  templateUrl: './view-personal-information.component.html',
  styleUrls: ['./view-personal-information.component.scss']
})
export class ViewPersonalInformationComponent implements OnInit{

  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();
 
  messages:any;
  subscription: Subscription;
  // beforeModalEdit:any;
  // public formSection={  
  //   name:'personal'
  // }
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService: NgbModal  ) { }

  ngOnInit() {
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      this.messages=message;
    })
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
      const modalRef = this.modalService.open(ModalComponent);
    }else{
      this.editProfile.emit({obj: "", action: actionName})
    }
  }
}


