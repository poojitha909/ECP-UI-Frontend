import { Component, OnInit } from '@angular/core';

import { PageParam } from 'src/app/core';
import { HomeService } from '../../home.service';
import { JDCategory, Service } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';


@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;

  searchPageParam: PageParam = {
    p: 0,
    s: 5,
    term: ''
  };

  autocompleteFields: Service[] = [];

  searchData: any = {
    services: [],
    products: [],
    Communitys: []
  };
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getAutoCompleteServices().subscribe(
        response => {
          this.autocompleteFields = response;
        });
    } else {
      this.autocompleteFields = [];
      this.showReset = false;
    }
  }

  resetSearch() {
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
  }

  onSearch() {
    if (this.searchPageParam.term && this.searchPageParam.term !== '') {
      this.autocompleteFields = [];
      const param = this.searchPageParam.term;
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getServices().subscribe(response => {
        this.searchData.services = response.data;
        this.searchPageParam.term = param;
        // console.log(param);
      },
        error => {
          console.log(error);
        });
    }
  }

  onAutocompleteClick(field) {
    this.searchPageParam.term = field;
    this.autocompleteFields = [];
  }

}
