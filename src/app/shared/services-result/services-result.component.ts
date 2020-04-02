import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { JdCategoryService } from 'src/app/core/services';
import { Category, Service, PageParam } from 'src/app/core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EpcServiceService } from 'src/app/features/services/epc-service.service';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-services-result',
  templateUrl: './services-result.component.html',
  styleUrls: ['./services-result.component.scss']
})
export class ServicesResultComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() internalProcessing: boolean;

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

  constructor(
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private jdCategoryService: JdCategoryService,
    public ecpService: EpcServiceService,
    private homeService: HomeService,
    private router: Router
  ) {
    this.categories = jdCategoryService.serviceCategories;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    if (!this.internalProcessing) {
      this.activeRoute.queryParamMap.subscribe(
        value => {
          // this.currentUrl = encodeURI(window.location.href);
          this.mailUrl = `mailto:?subject=%0AThis%20is%20Service%20from%20An%20Elder%20Spring%20Initiative%20by%20Tata%20Trusts&body=%0AService%2DURL:%20${encodeURI(window.location.href)}`;
          this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(window.location.href)}`);
          this.whatsMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(window.location.href)}`);
          const queryCategory = value.get("category");
          const catId = value.get("catid");
          // const searchTxt = value.get("searchTxt");

          if (queryCategory) {
            this.ecpService.searchedService = queryCategory;
            if (catId) {
              this.ecpService.searchCatID = catId;
              //Set selected category

              if (!this.selectedCategoryType) {
                let subCategory = null;
                this.selectedCategoryType = this.categories.find(category => {
                  subCategory = category.subCategories.find(subCat => subCat.id == catId);
                  if (subCategory) {
                    return true;
                  }
                });
                if (subCategory) {
                  this.getCategoryServices(subCategory.name, subCategory.id, this.homeService.homeSearchtxt);
                }
              } else {
                const selSubCat = this.selectedCategoryType.subCategories.find(subCategory => subCategory.id == catId);
                this.getCategoryServices(selSubCat.name, selSubCat.id, this.homeService.homeSearchtxt);
              }


            } else {
              //Set selected category
              if (!this.selectedCategoryType) {
                this.selectedCategoryType = this.categories.find(type => type.name.trim().toLowerCase() == queryCategory.trim().toLowerCase());
              }
              this.ecpService.searchCatID = null;
              this.getCategoryServices(queryCategory, 0, this.homeService.homeSearchtxt);
            }
            this.showShareBox = true;
          } else {

            this.showShareBox = false;
            if (this.homeService.homeSearchtxt) {
              this.getCategoryServices('', 0, this.homeService.homeSearchtxt);
            } else {
              this.getAllService();
            }
            this.selectedCategoryType = undefined;
          }


        });
    } else {
      if (this.homeService.homeSearchtxt) {
        this.getCategoryServices('', 0, this.homeService.homeSearchtxt);
      }
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log(changes);
      console.log("this.internalProcessing", this.internalProcessing);
    }

  }

  onChangePage(services: any[]) {
    // update current page of items
    this.pageServices = services;
    this.cdr.detectChanges();
    const elmnt = document.getElementById("serviceList");
    elmnt.scrollIntoView();
    // UIkit.scroll('#serviceList').scrollTo('#serviceList');
  }

  clearSelection() {
    this.selectedCategory = 'All';
    this.selectedCategoryType = null;
    this.selectedCatid = null;
    this.ecpService.searchedService = '';
    this.ecpService.searchCatID = '';
    this.router.navigateByUrl('services');
  }


  onCategoryChanged(categoryChanges: any) {
    if (categoryChanges) {
      if (!this.internalProcessing) {
        this.router.navigate(['services'], { queryParams: { category: categoryChanges.catName, catid: categoryChanges.catId, searchTxt: this.homeService.homeSearchtxt } });
      }
    }
  }

  getCategoryServices(category, catId, searchTxt?) {
    if (catId) {
      this.showingCategory = category;
      this.selectedCategory = category;
    } else {
      this.showingCategory = 'All ' + category;
      this.selectedCategory = 'All';
    }
    // !this.selectedCategoryType ? this.searchPageParam.term = category : '';
    this.isLoading = true;
    let param: PageParam = {
      p: 0,
      s: 50,
      catid: catId,
    };

    if (category) {
      param.catName = category;
    }
    if (searchTxt) {
      param.term = searchTxt;
    }
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


  /**
   * Mobile view Category filter
   */
  // applyFilter() {
  //   UIkit.modal('#mobile-category-modal').hide();
  //   if (this.selectedCategoryType && this.selectedCategory == 'All') {
  //     this.onCategoryChanged(this.selectedCategoryType.name, '');
  //   } else if (this.selectedCategoryType && this.selectedCatid) {
  //     this.onCategoryChanged(this.selectedCategory, this.selectedCatid);
  //   } else {
  //     this.clearSelection();
  //   }
  // }

  // clearFilter() {
  //   this.selectedCategoryType = null;
  //   this.selectedCatid = null;
  //   this.selectedCategory = 'All';
  //   // this.router.navigateByUrl('services/all');
  // }

}
