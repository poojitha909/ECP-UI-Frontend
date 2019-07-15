import { Component, OnInit } from '@angular/core';
import { PageParam } from 'src/app/core';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

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