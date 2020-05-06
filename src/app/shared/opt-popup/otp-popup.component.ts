import { Component, Input, Output, OnChanges, EventEmitter, SimpleChange } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
declare var UIkit: any;

@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.scss']
})
export class OtpPopupComponent implements OnChanges{
  @Input() showModal: boolean;
  @Input() mobileNum: string;
  @Output() updateOtp = new EventEmitter<string>();
  otp: string;

  constructor(private authService: AuthService) {
    this.otp=""
  }
  
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.update();
  }

  update(){
    this.otp = "";
    if(this.showModal){
      UIkit.modal('#modal-otp-input').show();
      if(!this.mobileNum){
        alert("No mobile number found to send otp")
      }
      else{
        this.authService.sendOtp(this.mobileNum).subscribe(response => {
          console.log(response);
        },
          error => {
            console.log(error);
          });
      }
    }
    else{
      UIkit.modal('#modal-otp-input').hide();
    }
  }

  submitOtp() {
    this.updateOtp.next(this.otp);
  }
  cancelOtp() {
    this.otp = "";
    this.updateOtp.next(this.otp);
  }
}
