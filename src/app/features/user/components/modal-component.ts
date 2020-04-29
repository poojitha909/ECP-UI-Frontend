import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ElementSchemaRegistry } from '@angular/compiler';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Notice!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Please Save or Cancel your changes before editing new section.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark"  (click)="close()">Close</button>
    </div>
  `
})
export class ModalComponent implements OnInit{

  // @Input() public formSection;

  constructor(public activeModal: NgbActiveModal,private userservice:UserService) {}

  ngOnInit(){
    // const data=this.formSection
    // console.log(data);
  }
  close(){
    this.activeModal.close('Close click')
    this.userservice.modalClose("closeModal")
  }
}

