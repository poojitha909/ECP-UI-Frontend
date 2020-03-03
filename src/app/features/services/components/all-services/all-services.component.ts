import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service, PageParam, SEO, Breadcrumb } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
declare var UIkit: any;

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Services',
      link: '/services'
    }
  ];

  services: Service[] = [];
  allService: Service[] = [];
  pageServices: Service[] = [];
  pageSize = 4;
  maxPages: number;
  isLoading: boolean;
  searchTextChanged = new Subject<string>();
  selectedValue: string;
  searchPageParam: PageParam = {
    p: 0,
    s: 4,
    term: ''
  };
  autocompleteFields: Service[] = [];
  // currentUrl: string;
  whatsappUrl;
  whatsMobileUrl;

  showShareBox: boolean;
  verfiedCheck: boolean;
  selectedCategory: string = 'All';
  selectedCategoryType: string;
  mailUrl: string;
  categoryTypes: string[];
  categories: any;
  selectedCatid: string;
  showingCategory: string = 'All Services';

  constructor(public ecpService: EpcServiceService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {

    this.categories = this.activeRoute.snapshot.data.categories;
    this.categoryTypes = Object.keys(this.categories).reverse();
    // Generate meta tag 
    const config: SEO = {
      title: `All Service - An Elder Spring Initiative by Tata Trusts`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Services-320.png`,
    }

    this.seoService.generateTags(config);

  }

  @HostListener('window:click', ['$event.target'])
  clear() {
    this.autocompleteFields = [];
    this.selectedValue = "";
  }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    });
    // this.currentUrl = encodeURI(window.location.href);
    this.mailUrl = `mailto:?subject=%0AThis%20is%20Service%20from%20An%20Elder%20Spring%20Initiative%20by%20Tata%20Trusts&body=%0AService%2DURL:%20${encodeURI(window.location.href)}`
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(window.location.href)}`);
    this.whatsMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(window.location.href)}`);
  }

  ngAfterViewInit() {

    this.activeRoute.queryParamMap.subscribe(
      value => {
        // this.currentUrl = encodeURI(window.location.href);
        this.mailUrl = `mailto:?subject=%0AThis%20is%20Service%20from%20An%20Elder%20Spring%20Initiative%20by%20Tata%20Trusts&body=%0AService%2DURL:%20${encodeURI(window.location.href)}`;
        this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(window.location.href)}`);
        this.whatsMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(window.location.href)}`);
        const queryCategory = value.get("category");
        const categoryLink = value.get("categoryLink");
        const catId = value.get("catid");

        if (categoryLink) {
          this.ecpService.searchedService =categoryLink;
          let category = null;
          this.selectedCategoryType = this.categoryTypes.find(value => {
            category = this.categories[value].find(category => category.category_name.toLowerCase() == categoryLink.toLowerCase());
            if (category) {
              return true;
            }
          });
          if (category) {
            this.ecpService.searchCatID = category.national_catid;
            this.getCategoryServices(categoryLink, category.national_catid);
          } else {
            this.selectedCategoryType = this.categoryTypes.find(type => type == queryCategory);
            this.getCategoryServices(categoryLink, 0);
          }


        } else {
          if (queryCategory) {
            this.ecpService.searchedService = queryCategory;
            if (catId) {
              this.ecpService.searchCatID = catId;
              this.getCategoryServices(queryCategory, catId);
              //Set selected category
              if (!this.selectedCategoryType) {
                let category = null;
                this.selectedCategoryType = this.categoryTypes.find(value => {
                  category = this.categories[value].find(category => category.national_catid == catId);
                  if (category) {
                    return true;
                  }
                });
              }

            } else {
              //Set selected category
              if (!this.selectedCategoryType) {
                this.selectedCategoryType = this.categoryTypes.find(type => type == queryCategory);
              }
              this.ecpService.searchCatID = null;
              this.getCategoryServices(queryCategory, 0);
            }
            this.showShareBox = true;
          } else {

            this.showShareBox = false;
            this.getAllService();
            this.selectedCategoryType = undefined;
          }
        }
      });


  }

  getAllService() {
    this.isLoading = true;
    this.ecpService.searchedService = null;
    this.ecpService.searchCatID = null;

    this.ecpService.getAllServices().subscribe(
      response => {
        if (response) {
          this.services = response;
          this.allService = this.services;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          this.verfiedCheck = false;
          this.isLoading = false;
          // this.router.navigateByUrl('services/all');
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
    if (catId) {
      this.showingCategory = category;
      this.selectedCategory = category;
    } else {
      this.showingCategory = 'All ' + category;
      this.selectedCategory = 'All';
    }
    !this.selectedCategoryType ? this.searchPageParam.term = category : '';
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
          // this.searchPageParam.term = category;
        }
      },
      error => {
        this.services = [];
        this.allService = [];
        this.pageServices = [];
        // this.searchPageParam.term = category;
        this.isLoading = false;
      });
  }

  onCategoryChanged(category, catId) {
    this.searchPageParam.term = '';
    this.router.navigate(['services/all'], { queryParams: { category: category, catid: catId } });
  }

  clearSelection() {
    this.selectedCategory = 'All';
    this.selectedCategoryType = '';
    this.selectedCatid = null;
    this.searchPageParam.term = '';
    this.router.navigateByUrl('services/all');
  }

  clearSerach(event: any) {
    this.searchPageParam.term = '';
    this.router.navigateByUrl('services/all');
  }

  onChangePage(services: any[]) {
    // update current page of items
    this.pageServices = services;
    this.cdr.detectChanges();
    const elmnt = document.getElementById("serviceList");
    elmnt.scrollIntoView();
    // UIkit.scroll('#serviceList').scrollTo('#serviceList');
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

        if (service.hasOwnProperty('basicProfileInfo')) {
          this.router.navigate([`/services/${service.basicProfileInfo.firstName}/${service.id}/${true}`]);
        } else {
          this.router.navigate([`/services/${service.name}/${service.docid}/${false}`]);
        }

      } else {
        this.router.navigate(['services/all'], { queryParams: { category: field } });
        // this.getCategoryServices(field, 0);
      }
      this.selectedValue = "";
      this.autocompleteFields = [];
    }
  }

  onSearchClick(service: Service) {
    if (service) {
      // let service: Service;
      // service = this.autocompleteFields.find(service => {
      //   if (service.name && service.name == field) {
      //     return true
      //   } else if (service.basicProfileInfo && service.basicProfileInfo.firstName == field) {
      //     return true;
      //   }
      // });

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

  applyFilter() {
    UIkit.modal('#mobile-category-modal').hide();
    if (this.selectedCategoryType && this.selectedCategory == 'All') {
      this.onCategoryChanged(this.selectedCategoryType, '');
    } else if (this.selectedCategoryType && this.selectedCatid) {
      this.onCategoryChanged(this.selectedCategory, this.selectedCatid);
    } else {
      this.clearSelection();
    }
  }

  clearFilter() {
    this.selectedCategoryType = '';
    this.selectedCatid = null;
    this.selectedCategory = 'All';
    // this.router.navigateByUrl('services/all');
  }
  ngOnDestroy() {
    document.getElementById("mobile-category-modal").remove();
  }
}
