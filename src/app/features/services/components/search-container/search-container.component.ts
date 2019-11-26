import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from 'src/app/features/home/home.service';
import { PageParam } from 'src/app/core';
import { Service } from 'src/app/core/interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StorageHelperService } from 'src/app/core/services';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  selectedValue: string;
  popullarService: Service[];
  searchTextChanged = new Subject<string>();
  searchPageParam: PageParam = {
    p: 0,
    s: 6,
    term: ''
  };


  autocompleteFields: Service[] = [];

  constructor(private homeService: HomeService, private router: Router, private storageHelper: StorageHelperService) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    });

    const homeSearchtxt = this.storageHelper.retrieveSession('homeSearchText');
    if (homeSearchtxt) {
      this.searchPageParam.term = homeSearchtxt;
      this.showReset = true;
    }

  }

  @HostListener('window:click', ['$event.target'])
  clear() {
    this.autocompleteFields = [];
    this.selectedValue = "";
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true;
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

  searchService() {
    // const param = this.searchPageParam.term;
    this.homeService.searchParam = this.searchPageParam;
    this.homeService.getServices().subscribe(response => {
      this.popullarService = response.data.slice(0, 6);
    },
      error => {
        console.log(error);
      });
  }


  onSearch(field?: string) {
    if (field || this.selectedValue) {
      let service: Service;
      if (this.selectedValue) {
        // this.searchPageParam.term = this.selectedValue;
        service = this.autocompleteFields.find(service => {
          if (service.name && service.name == this.selectedValue) {
            return true
          } else if (service.basicProfileInfo && service.basicProfileInfo.firstName == this.selectedValue) {
            return true;
          }
        });

        if (service.hasOwnProperty('basicProfileInfo')) {
          this.router.navigate([`/services/${service.basicProfileInfo.firstName}/${service.id}/${true}`]);
        } else {
          this.router.navigate([`/services/${service.name}/${service.docid}/${false}`]);
        }

      } else {
        this.searchService();
      }
      this.selectedValue = "";
      this.autocompleteFields = [];
      this.storageHelper.clearSession('homeSearchText');
    }
  }

  resetSearch() {
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
  }


  onAutocompleteClick(service: Service) {
    // this.searchPageParam.term = field;
    // this.selectedValue = "";
    // this.autocompleteFields = [];
    if (service) {
      if (service.hasOwnProperty('basicProfileInfo')) {
        this.router.navigate([`/services/${service.basicProfileInfo.firstName}/${service.id}/${true}`]);
      } else {
        this.router.navigate([`/services/${service.name}/${service.docid}/${false}`]);
      }
    }
  }

  searchEvent($event) {
    if ($event.keyCode !== 13) {
      this.searchTextChanged.next($event.target.value);
    }
  }

  onItemSelected(value) {
    this.selectedValue = value;
    // this.searchPageParam.term = value;
  }

}
