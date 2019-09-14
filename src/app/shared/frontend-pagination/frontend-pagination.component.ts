import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, AfterViewInit } from '@angular/core';
import paginate from 'jw-paginate';


@Component({
  selector: 'app-frontend-pagination',
  templateUrl: './frontend-pagination.component.html',
  styleUrls: ['./frontend-pagination.component.scss']
})
export class FrontendPaginationComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() items: any[];
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager: any = {};

  constructor() { }

  ngOnInit() {
    // set page if items array isn't empty
    // if (this.items && this.items.length) {
    //   this.setPage(this.initialPage);
    // }
  }

  ngAfterViewInit() {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page

    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }

}
