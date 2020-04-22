import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { JdCategoryService } from 'src/app/core/services';
import { Category, Service, serviceParam } from 'src/app/core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EpcServiceService } from 'src/app/features/services/epc-service.service';
import { HomeService } from 'src/app/features/home/home.service';
declare var UIkit: any;

@Component({
  selector: 'app-services-result',
  templateUrl: './services-result.component.html',
  styleUrls: ['./services-result.component.scss']
})
export class ServicesResultComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() internalProcessing: boolean;
  @Input() searchTxt: string;
  @Output() totalServices: EventEmitter<number> = new EventEmitter();

  categories: Category[];
  mailUrl: string;
  whatsappUrl;
  whatsMobileUrl;
  selectedCategoryType: Category;
  showShareBox: boolean;
  services: Service[] = [];
  allService: Service[] = [];
  pageServices: Service[] = [];
  selectedCategory: string = 'All';
  selectedCatid: string;
  showingCategory: string = 'All Services';
  isLoading: boolean;
  maxPages: number;
  verfiedCheck: boolean;
  pageSize = 4;
  activePage: number = 1;
  // selectedCatid: string;

  constructor(
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private jdCategoryService: JdCategoryService,
    public ecpService: EpcServiceService,
    public homeService: HomeService,
    private router: Router
  ) {
    // this.categories = jdCategoryService.serviceCategories;
  }

  ngOnInit() {
    this.showShareBox = false;
  }

  ngAfterViewInit() {

    if (!this.internalProcessing) {
      this.activeRoute.queryParamMap.subscribe(
        value => {
          // this.currentUrl = encodeURI(window.location.href);
          this.mailUrl = `mailto:?subject=%0ACheck%20this%20website%20Joy%20of%20Age&body=%0AService%2DURL:%20${encodeURI(window.location.href)}`;
          this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(window.location.href)}`);
          this.whatsMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(window.location.href)}`);
          const queryCategory = value.get("category");
          const catId = value.get("catid");
          const searchTxt = value.get("searchTxt");
          const page = value.get("page");

          this.activePage = (page ? parseInt(page) : 0);

          if (!this.homeService.homeSearchtxt && searchTxt) {
            this.homeService.homeSearchtxt = searchTxt;
          }

          if (queryCategory || catId) {
            this.filterCategoryList(queryCategory, catId, this.homeService.homeSearchtxt);
          } else {
            this.selectedCategoryType = undefined;
            if (this.homeService.homeSearchtxt || this.homeService.serviceCategory || this.homeService.serviceSubCategory) {
              this.filterCategoryList(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.homeService.homeSearchtxt);
              // this.getCategoryServices(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.homeService.homeSearchtxt);
            } else {
              this.filterCategoryList('', 0, '');
              this.getAllService();
              this.showingCategory = 'All Services';
            }
          }


        });
    } else {

      if (this.searchTxt) {
        this.ecpService.searchedService = '';
        this.ecpService.searchCatID = '';
        this.filterCategoryList(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.searchTxt);
        // this.getCategoryServices(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.searchTxt);
      }
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {

    }

  }

  showServices() {
    this.ecpService.activePage = this.activePage;
    const start = this.activePage * this.pageSize;
    const end = start + this.pageSize;
    this.pageServices = this.allService.slice(start, end);
    this.cdr.detectChanges();
  }
  // onChangePage(pageData: any) {
  //   // update current page of items
  //   this.pageServices = pageData.services;
  //   this.ecpService.activePage = pageData.currentPage;
  //   // if (pageData.currentPage !== 1) {
  //   this.router.navigate(
  //     [],
  //     {
  //       relativeTo: this.activeRoute,
  //       queryParams: { page: pageData.currentPage },
  //       queryParamsHandling: 'merge'
  //     });
  //   // }
  //   this.cdr.detectChanges();
  //   const elmnt = document.getElementById("serviceList");
  //   elmnt.scrollIntoView();
  //   // UIkit.scroll('#serviceList').scrollTo('#serviceList');
  // }

  changePage(page: number) {
    if (!this.internalProcessing) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activeRoute,
          queryParams: { page: page },
          queryParamsHandling: 'merge'
        });
    }
    else {
      this.activePage = page;
      this.showServices();
    }
  }
  // onChangePage(pageData: any) {
  //   // update current page of items
  //   this.pageServices = pageData.services;
  //   this.ecpService.activePage = pageData.currentPage;
  //   // if (pageData.currentPage !== 1) {
  //   this.router.navigate(
  //     [],
  //     {
  //       relativeTo: this.activeRoute,
  //       queryParams: { page: pageData.currentPage },
  //       queryParamsHandling: 'merge'
  //     });
  //   // }
  //   this.cdr.detectChanges();
  //   const elmnt = document.getElementById("serviceList");
  //   elmnt.scrollIntoView();
  //   // UIkit.scroll('#serviceList').scrollTo('#serviceList');
  // }

  clearSelection() {
    this.selectedCategory = 'All';
    this.selectedCategoryType = null;
    this.selectedCatid = null;
    this.ecpService.searchedService = '';
    this.ecpService.searchCatID = '';
    if (!this.internalProcessing) {
      this.router.navigate(['services'], { queryParams: { category: '', catid: '', searchTxt: this.homeService.homeSearchtxt } });
    } else {
      this.getCategoryServices('', 0, this.homeService.homeSearchtxt);
    }
  }


  onCategoryChanged(categoryChanges: any) {
    if (categoryChanges) {
      if (!this.internalProcessing) {
        this.router.navigate(['services'], { queryParams: { category: categoryChanges.ParentCatid, catid: categoryChanges.catId, searchTxt: this.homeService.homeSearchtxt } });
      } else {
        this.filterCategoryList(categoryChanges.ParentCatid, categoryChanges.catId, this.homeService.homeSearchtxt);
      }
    }
  }

  getCategoryServices(category, catId, searchTxt?) {
    if (catId) {
      const selSubCat = this.selectedCategoryType.subCategories.find(subCat => {
        if (subCat.source.find(source => source.catid == catId)) {
          return true
        }
      });
      this.showingCategory = category;
      this.selectedCategory = selSubCat.name;
      if (selSubCat.source && selSubCat.source.length > 1) {
        catId = `${selSubCat.source[0].catid},${selSubCat.source[1].catid}`;
      }

    } else {
      this.showingCategory = 'All ' + category;
      this.selectedCategory = 'All';
    }
    // !this.selectedCategoryType ? this.searchPageParam.term = category : '';
    this.isLoading = true;
    let param: serviceParam = {
      pageNo: 0
    };

    if (catId) {
      param.catId = catId;
    }

    if (category) {
      param.parentCatid = category;
    }
    if (searchTxt) {
      param.term = searchTxt;
    }

    if (this.verfiedCheck) {
      param.isVerified = this.verfiedCheck
    }
    // this.homeService.searchParam.s = 50;
    // this.homeService.searchParam.term = category;
    this.homeService.getCategoryServices(param).subscribe(
      response => {
        if (response && response.data) {
          this.services = response.data;
          this.totalServices.emit(this.services.length);
          if (this.internalProcessing && this.services.length > 4) {
            this.services = this.services.slice(0, 4);
          }
          this.allService = this.services;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          // this.verfiedCheck = false;
          this.isLoading = false;
          this.showServices();
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

  getAllService() {
    this.isLoading = true;
    this.ecpService.searchedService = null;
    this.ecpService.searchCatID = null;

    if (this.verfiedCheck) {
      this.ecpService.serviceParam.isVerified = this.verfiedCheck
    } else {
      this.ecpService.serviceParam.isVerified = false;
    }

    this.ecpService.getAllServices().subscribe(
      response => {
        if (response) {
          this.services = response;
          this.allService = this.services;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          // this.verfiedCheck = false;
          this.isLoading = false;
          this.showServices();
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

  onCheckVerified(checked) {

    if (this.homeService.homeSearchtxt || this.homeService.serviceCategory || this.homeService.serviceSubCategory) {
      this.filterCategoryList(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.homeService.homeSearchtxt);
      // this.getCategoryServices(this.homeService.serviceCategory, this.homeService.serviceSubCategory, this.homeService.homeSearchtxt);
    } else {
      this.filterCategoryList('', 0, '');
      this.getAllService();
    }
  }

  filterCategoryList(queryCategory, catId, searchTxt) {

    let param: serviceParam = {
      pageNo: 0
    };

    if (catId) {
      param.catId = catId;
    }

    if (queryCategory) {
      param.parentCatid = queryCategory;
    }
    if (searchTxt) {
      param.term = searchTxt;
    }

    if (this.verfiedCheck) {
      param.isVerified = this.verfiedCheck
    }

    this.jdCategoryService.fetchAllCategories(param).subscribe(
      response => {
        this.categories = response;
        this.ecpService.searchedService = queryCategory;

        //  filter category
        if (catId) {
          this.ecpService.searchCatID = catId;

          if (catId.includes(",")) {
            const catIds = catId.split(",")
            catId = catIds[0];
          }
          //Set selected category
          // if (!this.selectedCategoryType) {
          let subCategory = null;
          this.selectedCategoryType = this.categories.find(category => {
            subCategory = category.subCategories.find(subCat => {
              if (subCat.source.find(source => source.catid == catId)) {
                return true
              }
            });
            if (subCategory) {
              return true;
            }
          });
          if (subCategory) {
            this.getCategoryServices(this.selectedCategoryType.id, subCategory.source[0].catid, this.homeService.homeSearchtxt);
          }
        } else if (queryCategory) {
          //Set selected category
          // if (!this.selectedCategoryType) {
          this.selectedCategoryType = this.categories.find(category => category.id == queryCategory);
          // }
          this.ecpService.searchCatID = null;
          this.getCategoryServices(this.selectedCategoryType.id, 0, this.homeService.homeSearchtxt);
        } else if (searchTxt) {
          this.getCategoryServices('', '', searchTxt);
        }
        this.showShareBox = true;
      },
      error => {
        console.log(error);
      });
  }
  /**
   * Mobile view Category filter
   */
  applyFilter() {
    UIkit.modal('#mobile-category-modal').hide();
    if (this.selectedCategoryType && this.selectedCategory == 'All') {
      const selectedData = {
        ParentCatid: this.selectedCategoryType.id,
        catId: ''
      };
      this.onCategoryChanged(selectedData);
    } else if (this.selectedCategoryType && this.selectedCatid) {
      const selectedData = {
        ParentCatid: this.selectedCategoryType.id,
        catId: this.selectedCatid
      };
      this.onCategoryChanged(selectedData);
    } else {
      this.clearSelection();
    }
  }

  clearFilter() {
    this.selectedCategoryType = null;
    this.selectedCatid = null;
    this.selectedCategory = 'All';
    // this.router.navigateByUrl('services/all');
  }

}
