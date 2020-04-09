import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalRecords: number;
  @Input() currentPage: number;
  @Input() perPage: number;
  @Output() pageChangeCall = new EventEmitter<string>();

  items: number[];
  activeItem: number;
  lastPage: number
  constructor() {
    this.items = [];
    this.activeItem = this.currentPage;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.update();
  }

  callParent(value: number) {
    this.activeItem = value;
    this.pageChangeCall.next(value + "");
  }

  update(){
    this.activeItem = this.currentPage ? this.currentPage : 0;
    const pages = Math.ceil(this.totalRecords / this.perPage);
    this.items = [];
    let start =  ( (this.activeItem - 3) > 0 ) ? (this.activeItem - 3) : 0;
    let end =  ( pages < (start + 7) ) ? pages : (start + 7);
    for (let i = 0; i < end-start; i++) {
      this.items[i] = start + i;
    }
    this.lastPage = pages - 1 ;
  }
}
