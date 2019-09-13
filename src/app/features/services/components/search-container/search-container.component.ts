import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from 'src/app/features/home/home.service';
import { PageParam } from 'src/app/core';
import { Service } from 'src/app/core/interfaces';

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

  constructor(private homeService: HomeService, private router: Router) { }

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

  onSearch() {
    if (this.searchPageParam.term) {
      this.homeService.selectedCategory = this.searchPageParam.term;
      this.router.navigateByUrl('/services/all');
    }
  }

  resetSearch() {
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
  }


  onAutocompleteClick(field) {
    this.searchPageParam.term = field;
    this.autocompleteFields = [];
  }

}
