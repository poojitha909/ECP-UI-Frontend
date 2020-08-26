import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-merged-account-modal',
  templateUrl: './merged-account-modal.component.html',
  styleUrls: ['./merged-account-modal.component.scss']
})
export class MergedAccountModalComponent  implements OnChanges {
  @Input() showModal: boolean = false;
  @Output() onModalVisibilityChange:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.showModal.currentValue) {
      if (this.showModal) {
        UIkit.modal('#modal-merged-acc').show();
      }else{
        UIkit.modal('#modal-merged-acc').hide();
      }
    }
  }

  close(){
    this.setModalVisibility(false);
  }

  setModalVisibility(status:boolean){
    if (status) {
      UIkit.modal('#modal-merged-acc').show();
    }else{
      UIkit.modal('#modal-merged-acc').hide();
      setTimeout(()=>{
        location.reload();
      },100);
    }
    this.onModalVisibilityChange.emit(status)
  }

}
