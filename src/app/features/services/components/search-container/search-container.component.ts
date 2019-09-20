import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from 'src/app/features/home/home.service';
import { PageParam } from 'src/app/core';
import { Service } from 'src/app/core/interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  popullarService: Service[];
  searchTextChanged = new Subject<string>();
  searchPageParam: PageParam = {
    p: 0,
    s: 5,
    term: ''
  };


  autocompleteFields: Service[] = [];

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    });
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
    if (this.searchPageParam.term && this.searchPageParam.term !== '') {
      this.autocompleteFields = [];
      const param = this.searchPageParam.term;
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getServices().subscribe(response => {
        this.popullarService = response.data.slice(0, 5);
        this.searchPageParam.term = param;
        // console.log(param);
      },
        error => {
          console.log(error);
        });
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

  searchEvent($event) {
    this.searchTextChanged.next($event.target.value);
  }

}
