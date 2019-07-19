import { Component, OnInit } from '@angular/core';
import { PageParam } from 'src/app/core';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {

  showReset: boolean;
  searchValue: string;
  searchPageParam: PageParam = {
    p: 0,
    s: 10,
    term: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
  }

  resetSearch() {
    this.searchValue = "";
    this.showReset = false;
  }

  onSearch() {
    if (this.searchValue && this.searchValue !== '') {
      this.searchPageParam.term = this.searchValue;
    }
  }

}