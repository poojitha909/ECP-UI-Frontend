import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service, PageParam, SEO } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';
import { HomeService } from 'src/app/features/home/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit, AfterViewInit {
  services: Service[] = [];
  allService: Service[] = [];
  pageServices: Service[] = [];
  pageSize = 5;
  maxPages: number;
  isLoading: boolean;
  searchTextChanged = new Subject<string>();
  selectedValue: string;
  searchPageParam: PageParam = {
    p: 0,
    s: 5,
    term: ''
  };
  autocompleteFields: Service[] = [];
  currentUrl: string;
  whatsappUrl;
  verfiedCheck: boolean;

  constructor(public ecpService: EpcServiceService,
    public JDcategory: JdCategoryService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {

    // Generate meta tag 
    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts All Service`,
      keywords: 'products,services,events,,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/service-bg.png`,
    }

    this.seoService.generateTags(config);

  }

  @HostListener('window:click', ['$event.target'])
  clear() {
    this.autocompleteFields = [];
  }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    });
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
  }

  ngAfterViewInit() {

    this.activeRoute.queryParamMap.subscribe(
      value => {
        const queryCategory = value.get("category");
        const catId = value.get("catid");
        if (queryCategory) {
          catId ? this.getCategoryServices(queryCategory, catId) : this.getCategoryServices(queryCategory, 0);
        } else {
          this.getAllService();
        }
      });

  }

  getAllService() {
    this.isLoading = true;
    this.ecpService.getAllServices().subscribe(
      response => {
        if (response) {
          this.services = response;
          this.allService = this.services;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          this.verfiedCheck = false;
          this.isLoading = false;
          this.router.navigateByUrl('services/all');
        }
      },
      error => {
        this.services = [];
        this.allService = [];
        this.pageServices = [];
        this.isLoading = false;
      })
  }

  getCategoryServices(category, catId) {
    this.isLoading = true;
    const param: PageParam = {
      p: 0,
      s: 50,
      catid: catId,
      term: category,
    };
    // this.homeService.searchParam.s = 50;
    // this.homeService.searchParam.term = category;
    this.homeService.getCategoryServices(param).subscribe(
      response => {
        if (response && response.data) {
          this.services = response.data;
          this.allService = this.services;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          this.verfiedCheck = false;
          this.isLoading = false;
          this.searchPageParam.term = category;
        }
      },
      error => {
        this.services = [];
        this.allService = [];
        this.pageServices = [];
        this.searchPageParam.term = category;
        this.isLoading = false;
      });
  }

  onCategoryChanged(category, catId) {
    this.router.navigate(['services/all'], { queryParams: { category: category, catid: catId } });
  }

  clearSelection() {
    this.searchPageParam.term = '';
    this.router.navigateByUrl('services/all');
  }

  onChangePage(services: any[]) {
    // update current page of items
    this.pageServices = services;
    this.cdr.detectChanges();
  }

  onSearchChange(value) {
    if (value !== "") {
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getAutoCompleteServices().subscribe(
        response => {
          this.autocompleteFields = response;
        });
    } else {
      this.autocompleteFields = [];
    }
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
      } else {
        service = this.autocompleteFields.find(service => {
          if (service.name && service.name == field) {
            return true
          } else if (service.basicProfileInfo && service.basicProfileInfo.firstName == field) {
            return true;
          }
        });
      }

      if (service.hasOwnProperty('basicProfileInfo')) {
        this.router.navigate([`/services/${service.basicProfileInfo.firstName}/${service.id}/${true}`]);
      } else {
        this.router.navigate([`/services/${service.name}/${service.docid}/${false}`]);
      }

      // this.searchPageParam.term = field;


      // this.onCategoryChanged(this.searchPageParam.term, 0);
      // this.searchPageParam.term = "";
      this.selectedValue = "";
      this.autocompleteFields = [];
    }
  }

  searchEvent($event) {
    if ($event.keyCode !== 13) {
      this.searchTextChanged.next($event.target.value);
    }
  }

  onCheckVerified(checked) {
    if (checked) {
      this.services = this.allService.filter(service => {
        if (service.verified === '1' || service.verified === checked)
          return service
      });
    } else {
      this.services = this.allService;
    }
  }

  onItemSelected(value) {
    // this.onSearch(value);
    this.selectedValue = value;
    // this.searchPageParam.term = value;
  }
}
