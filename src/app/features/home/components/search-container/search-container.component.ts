import { Component, OnInit, HostListener } from '@angular/core';

import { PageParam } from 'src/app/core';
import { HomeService } from '../../home.service';
import { JDCategory, Service } from 'src/app/core/interfaces';
import { JdCategoryService, StorageHelperService } from 'src/app/core/services';
import { Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';


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
    s: 6,
    term: ''
  };

  autocompleteFields: Service[] = [];

  searchData: any = {
    services: [],
    products: [],
    discussions: [],
    experts: [],
    events: [],
    totalServices: 0,
    totalProducts: 0,
    totalDiscussions: 0,
    totalEvents: 0,
    totalExperts: 0
  };
  constructor(private homeService: HomeService, private router: Router, private storageHelper: StorageHelperService) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    })

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
    this.storageHelper.clearSession('homeSearchText');
  }

  homeSearchPages() {
    this.homeService.searchParam = this.searchPageParam;
    // Home search pages API
    this.homeService.getHomeSearchPages().subscribe(response => {

      if (response && response.servicePage) {
        const servicePage = JSON.parse(response.servicePage);
        this.searchData.services = servicePage.content.slice(0, 6);
        this.searchData.totalServices = servicePage.total
      }
      this.searchData.products = response.productPage.content;
      this.searchData.totalProducts = response.productPage.total;
      this.searchData.discussions = response.discussPage.content;
      this.searchData.totalDiscussions = response.discussPage.total;
      this.searchData.events = response.eventPage.content;
      this.searchData.experts = response.expertPage.content;
      this.searchData.totalEvents = response.eventPage.total;
      this.searchData.totalExperts = response.expertPage.total;


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
        this.storageHelper.storeSession('homeSearchText', field);
        this.homeSearchPages();
      }
      this.selectedValue = "";
      this.autocompleteFields = [];
    }
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
    // console.log($event, "onSearch event");
    if ($event.keyCode !== 13) {
      this.searchTextChanged.next($event.target.value);
    }
  }

  onItemSelected(value) {
    this.selectedValue = value;
    // this.searchPageParam.term = value;
  }

}
