import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from 'src/app/core/interfaces';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {
  @Output() cancelForm = new EventEmitter();
  @Input() eventEmitted : any;
  constructor() { }

  editOption:string;

  ngOnInit() {
    
  }

  onCancel() {
    this.cancelForm.emit();
  }
}
