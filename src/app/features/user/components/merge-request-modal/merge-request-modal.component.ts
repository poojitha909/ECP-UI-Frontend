import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-merge-request-modal',
  templateUrl: './merge-request-modal.component.html',
  styleUrls: ['./merge-request-modal.component.scss']
})
export class MergeRequestModalComponent implements OnChanges {
  @Input() showModal: boolean = false;
  @Input() isTypeMobile: boolean = true;
  @Output() onModalVisibilityChange:EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() isMergeRequired:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.showModal.currentValue) {
      if (this.showModal) {
        UIkit.modal('#modal-merge-req').show();
      }else{
        UIkit.modal('#modal-merge-req').hide();
      }
    }
  }

  doNotMerge(){
    this.setModalVisibility(false);
    this.isMergeRequired.emit(false);
  }

  proceedWithMerging(){
    this.setModalVisibility(false);
    this.isMergeRequired.emit(true);
  }

  setModalVisibility(status:boolean){
    if (status) {
      UIkit.modal('#modal-merge-req').show();
    }else{
      UIkit.modal('#modal-merge-req').hide();
    }
    this.onModalVisibilityChange.emit(status)
  }

}
