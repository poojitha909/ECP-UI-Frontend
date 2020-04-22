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
  public formSection={  
    name:'personal'
  }
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService: NgbModal  ) { }

  ngOnInit() {
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      console.log(message,"message from contact detial component")
      this.messages=message;
     
    })
  }

  edit(actionName){
    if(this.messages=='editForm'){
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.user = this.formSection;
    }else{
      console.log(actionName)
      this.editProfile.emit({obj: "", action: actionName})
    }
  }
}


