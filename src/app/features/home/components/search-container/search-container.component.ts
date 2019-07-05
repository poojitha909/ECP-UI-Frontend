import { Component, OnInit } from '@angular/core';

import { PageParam } from 'src/app/core';
import { HomeService } from '../../home.service';


@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  searchValue: string;
  searchPageParam: PageParam = {
    p: 0,
    s: 10,
    term: ''
  };
  constructor(private homeService: HomeService) { }

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
      this.homeService.getServices(this.searchPageParam).subscribe((data) => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
    }
  }

}
