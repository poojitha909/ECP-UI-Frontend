import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from 'src/app/features/home/home.service';
import { PageParam } from 'src/app/core';
import { Service, AutoCompleteField } from 'src/app/core/interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  showReset: boolean;
  selectedValue: string;
  popullarService: Service[];
  totalService: number;
  searchTextChanged = new Subject<string>();
  searchPageParam: PageParam = {
    p: 0,
    s: 6,
    term: ''
  };


  autocompleteFields: AutoCompleteField[] = [];

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    });

    if (this.homeService.homeSearchtxt) {
      this.searchPageParam.term = this.homeService.homeSearchtxt;
      this.showReset = true;
      // this.searchService();
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
      // this.homeService.searchParam = this.searchPageParam;
      this.homeService.getAutoCompleteServices(this.searchPageParam.term).subscribe(
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
    this.homeService.homeSearchtxt = this.searchPageParam.term;
    this.router.navigate(['/services'], { queryParams: { category: this.searchPageParam.term } })
    // this.homeService.searchParam = this.searchPageParam;
    // this.homeService.getServices().subscribe(response => {
    //   this.popullarService = response.data.slice(0, 6);
    //   this.totalService = response.total;
    // },
    //   error => {
    //     console.log(error);
    //   });
  }


  onSearch(field?: string) {
    if (field || this.selectedValue) {
      if (this.selectedValue) {
        // this.searchPageParam.term = this.selectedValue;
        // service = this.autocompleteFields.find(service => {
        //   if (service.name && service.name == this.selectedValue) {
        //     return true
        //   } else if (service.basicProfileInfo && service.basicProfileInfo.firstName == this.selectedValue) {
        //     return true;
        //   }
        // });

        // if (service.hasOwnProperty('basicProfileInfo')) {
        //   this.router.navigate([`/services/${service.basicProfileInfo.firstName}/${service.id}/${true}`]);
        // } else {
        //   this.router.navigate([`/services/${service.name}/${service.docid}/${false}`]);
        // }
        const service = this.autocompleteFields.find(service => service.value == this.selectedValue);

        if (service && service.type) {
          if (service.type == 2) {
            this.router.navigate([`/services/${service.value}/${service.id}/${false}`]);
          }

          if (service.type == 1) {
            this.router.navigate(['services'], { queryParams: { category: service.value, catid: service.id } });
            // this.router.navigate([`/services/${service.value}/${service.id}/${false}`]);
          }
        } else {
          this.router.navigate([`/services/${service.value}/${service.id}/${true}`]);
        }

      } else {
        this.searchService();
      }
      this.selectedValue = "";
      this.autocompleteFields = [];
    }
  }

  resetSearch() {
    this.searchPageParam.term = "";
    this.autocompleteFields = [];
    this.showReset = false;
    this.popullarService = undefined;
    this.homeService.homeSearchtxt = "";
    this.router.navigate(['/services'], { queryParams: { category: this.searchPageParam.term } });
  }


  onAutocompleteClick(service: AutoCompleteField) {
    if (service && service.type) {
      if (service.type == 2) {
        this.router.navigate([`/services/${service.value}/${service.id}/${false}`]);
      }

      if (service.type == 1) {
        this.router.navigate(['services'], { queryParams: { category: service.value, catid: service.id } });
      }
    } else {
      this.router.navigate([`/services/${service.value}/${service.id}/${true}`]);
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
