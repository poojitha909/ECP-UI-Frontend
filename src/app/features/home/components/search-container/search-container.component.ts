import { Component, OnInit } from '@angular/core';

import { PageParam } from 'src/app/core';
import { HomeService } from '../../home.service';
import { JDCategory, Service } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';
import { Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  searchTextChanged = new Subject<string>();
  selectedValue: string;
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
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    })
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
    console.log("reset");
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
  }

  onSearch() {
    if (this.searchPageParam.term && this.searchPageParam.term !== '') {
      if (this.selectedValue) {
        this.searchPageParam.term = this.selectedValue;
      }
      this.autocompleteFields = [];
      const param = this.searchPageParam.term;
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getServices().subscribe(response => {
        this.searchData.services = response.data.slice(0, 5);
        this.searchPageParam.term = param;
        this.selectedValue = "";
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

  searchEvent($event) {
    // console.log($event, "onSearch event");
    this.searchTextChanged.next($event.target.value);
  }

  onItemSelected(value) {
    this.selectedValue = value;
    // this.searchPageParam.term = value;
  }

}
