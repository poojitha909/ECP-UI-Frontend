import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { PageParam } from 'src/app/core';
import { HomeService } from '../../home.service';
import { Service } from 'src/app/core/interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  noRecords: boolean;
  searchTxt: string;
  totalRecords: number;
  searchPageParam: PageParam = {
    p: 0,
    s: 6,
    term: ''
  };

  autocompleteFields: Service[] = [];
  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    document.getElementById("homeSearch").focus();
    this.searchTextChanged.pipe(
      debounceTime(10),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    })


    if (this.homeService.homeSearchtxt) {
      this.searchPageParam.term = this.homeService.homeSearchtxt;
      // this.homeSearchPages();
      this.showReset = true;
      this.searchTxt = this.searchPageParam.term;
    }
  }

  @HostListener('window:click', ['$event.target'])
  clear() {
    this.autocompleteFields = [];
    this.selectedValue = "";
  }

  /**
   * Get Autocomplete data
   * @param value 
   */
  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true;
      // this.homeService.searchParam = this.searchPageParam;
      // this.homeService.getAutoCompleteServices().subscribe(
      //   response => {
      //     this.autocompleteFields = response;
      //   });
    } else {
      this.autocompleteFields = [];
      this.showReset = false;
      this.searchTxt = "";
      this.homeService.homeSearchtxt = "";
    }
  }


  resetSearch() {
    console.log("reset");
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
    this.searchTxt = "";
    this.homeService.homeSearchtxt = "";
    document.getElementById("homeSearch").focus();
    this.clearCategoriesFilter();
  }

  clearCategoriesFilter() {
    this.homeService.eventIsPastEvents = 0;
    this.homeService.discussCategory = "";
    this.homeService.expertCategory = "";
    this.homeService.productCategory = '';
    this.homeService.serviceCategory = "";
    this.homeService.serviceSubCategory = "";
  }

  // homeSearchPages() {
  //   this.isLoading = true;
  //   this.homeService.searchParam = this.searchPageParam;
  //   // Home search pages API
  //   this.homeService.getHomeSearchPages().subscribe(response => {
  //     this.isLoading = false;
  //     if (response && response.servicePage) {
  //       const servicePage = JSON.parse(response.servicePage);
  //       this.searchData.services = servicePage.content.slice(0, 6);
  //       this.searchData.totalServices = servicePage.total
  //     }
  //     this.searchData.products = response.productPage.content;
  //     this.searchData.totalProducts = response.productPage.total;
  //     this.searchData.discussions = response.discussPage.content;
  //     this.searchData.totalDiscussions = response.discussPage.total;
  //     this.searchData.events = response.eventPage.content;
  //     this.searchData.experts = response.expertPage.content;
  //     this.searchData.totalEvents = response.eventPage.total;
  //     this.searchData.totalExperts = response.expertPage.total;
  //     this.searchData.maxResult = Math.max(
  //       this.searchData.totalServices,
  //       this.searchData.totalProducts,
  //       this.searchData.totalDiscussions,
  //       this.searchData.totalEvents,
  //       this.searchData.totalExperts);
  //     if (this.searchData.maxResult == 0) {
  //       this.noRecords = true;
  //     } else {
  //       this.noRecords = false;
  //     }
  //     this.showResult = true;
  //   },
  //     error => {
  //       this.isLoading = false;
  //       console.log(error);
  //     });
  // }

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
        this.clearCategoriesFilter();
        this.homeService.homeSearchtxt = field;
        this.searchTxt = field;
      }
      this.selectedValue = "";
      this.autocompleteFields = [];
      document.getElementById("homeSearch").focus();
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

  getRecordsCount(allCounts) {
    this.totalRecords = 0;
    Object.values(allCounts).forEach((value: number) => {
      if (value) {
        this.totalRecords += value;
      }
    });
  }

}
