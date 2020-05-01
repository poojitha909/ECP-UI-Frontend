import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal-component';

@Component({
  selector: 'app-view-address-details',
  templateUrl: './view-address-details.component.html',
  styleUrls: ['./view-address-details.component.scss']
})
export class ViewAddressDetailsComponent implements OnInit {
  @Output() editProfile = new EventEmitter<{ obj: any, action: "" }>();
 
  messages:any;
  subscription: Subscription;
  beforeModalEdit:any;
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.subscription=this.userService.getFormEditMessage().subscribe(message=>{
      this.messages=message;
    })
    // this.subscription=this.userService.geteditFormSection().subscribe(res=>{
    //   if(res==="editSection"){
    //     // this.editProfile.emit({obj: "", action: this.beforeModalEdit});
    //     this.edit(this.beforeModalEdit);
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
