import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalRecords: number;
  @Input() currentPage: number;
  @Input() perPage: number;

  items: number[];
  activeItem: number;
  constructor() { 
    this.items = [];
    this.activeItem = 0;
  }

  ngOnInit() {
    const pages = Math.ceil(this.totalRecords / this.perPage);
    for(let i = 0; i < pages;i++){
      this.items[i] = i+1;
    }
  }

}
