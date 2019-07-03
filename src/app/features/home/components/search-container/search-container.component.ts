import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  searchValue: string;
  constructor() { }

  ngOnInit() {
  }

  onSearch(value) {
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
}
