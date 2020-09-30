import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core';
declare var UIkit: any;

@Component({
  selector: 'app-merge-request-modal',
  templateUrl: './merge-request-modal.component.html',
  styleUrls: ['./merge-request-modal.component.scss']
})
export class MergeRequestModalComponent implements OnChanges {
  @Input() isWhileRegistration = true
  @Input() showModal: boolean = false;
  @Input() isTypeMobile: boolean = true;
  @Input() oldAccountDetails: any;
  @Input() newUserDetails: any;
  @Output() onModalVisibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() isMergeRequired: EventEmitter<any> = new EventEmitter<any>()
  isRetrieveOldAccountInfo = false;
  mergingRequired: boolean = false;
  errorMessage:string = ""
  otpForMergingWithOldAccount:string = '';
  isOTPSent:boolean = false;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.showModal) {
      if (this.showModal) {
        UIkit.modal('#modal-merge-req').show();
      } else {
        UIkit.modal('#modal-merge-req').hide();
      }
      // if (this.oldAccountDetails) {
      //   console.log(this.oldAccountDetails)
      //   console.log(this.newUserDetails)
      // }
    }
  }

  verifyOtp(){
    this.auth.validateOTP(this.oldAccountDetails.phoneNumber, this.otpForMergingWithOldAccount).subscribe(response=>{
      if (response==true) {
        this.proceedWithMerging()
      } else {
        this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
      }
    },
      error => {
        console.log(error);
        this.isOTPSent = false;
    });
    // this.auth.verfiyOtpWithoutLogin(this.oldAccountDetails.phoneNumber, this.otpForMergingWithOldAccount).subscribe(response => {
    //   if (response) {
    //     this.proceedWithMerging()
    //   } else {
    //     this.errorMessage = "We could not match the OTP you entered with the one that was sent to you. Please retry with the OTP that was sent to your registered mobile number";
    //   }
    // },
    //   error => {
    //     console.log(error);
    //     this.isOTPSent = false;
    //   });
  }

  requestOtp(){
    this.auth.sendOtp(this.oldAccountDetails.phoneNumber).subscribe(response => {
      if (response.type === "success") {
        this.isOTPSent = true;
      } else {
        this.isOTPSent = false;
      }
    });
  }

  doNotMerge() {
    this.setModalVisibility(false);
    this.isMergeRequired.emit(false);
  }

  proceedWithMerging() {
    this.setModalVisibility(false);
    this.isMergeRequired.emit({
      isRetrieveOldAccountInfo:this.isRetrieveOldAccountInfo
    });
  }

  setModalVisibility(status: boolean) {
    if (status) {
      UIkit.modal('#modal-merge-req').show();
    } else {
      UIkit.modal('#modal-merge-req').hide();
    }
    this.onModalVisibilityChange.emit(status)
  }

}
