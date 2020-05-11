import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ElementSchemaRegistry } from '@angular/compiler';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal-component',
  template: `
    <div class="uk-modal-body">
      <h3 class="uk-modal-title">Notice!       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button></h3>

      <div class="uk-margin">
        <p>Please Save or Cancel your changes before editing new section.</p>
      </div>
      <p class="uk-text-right">
        <button class="uk-button uk-button-transparent uk-modal-close" type="button"
          (click)="close()">Cancel</button>
      </p>
    </div>
  `
})
export class ModalComponent implements OnInit {

  // @Input() public formSection;

  constructor(public activeModal: NgbActiveModal, private userservice: UserService) { }

  ngOnInit() {
    // const data=this.formSection
    // console.log(data);
  }
  close() {
    this.activeModal.close('Close click')
    this.userservice.modalClose("closeModal")
  }
}

