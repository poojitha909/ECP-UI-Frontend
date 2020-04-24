import { Component, OnInit, Input, Output, OnDestroy, AfterViewInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../features/products/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from 'src/app/features/home/home.service';
import { MenuService } from 'src/app/features/community/services/menu.service';
declare var UIkit: any;
@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss']
})
export class ProductResultsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
  @Input() searchTxt: string;
  isLoading: boolean;
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };



  showResult: boolean;
  productsList: any[];
  catsList: any[];


  currentUrl: string;
  showingProduct: string;
  paramsSubs: any;
  totalRecords: number;
  whatsappUrl: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, public sanitizer: DomSanitizer, private shareMedia: MenuService,
    private homeService: HomeService) {
  }

  ngOnInit() {
    this.currentUrl = encodeURI(window.location.href);
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    UIkit.util.on('#product-mobile-category-modal', 'hidden', () => {
      // do something
      if (this.showingProduct && this.showingProduct !== 'All Products') {
        this.searchParams.productCategory = this.catsList.find(cat => cat.name == this.showingProduct).id;
      } else {
        this.searchParams.productCategory = '';
      }
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!changes.searchTxt.firstChange) {
      this.initiate();
    }
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
    document.getElementById("product-mobile-category-modal").remove();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 4,
      searchTxt: "",
      productCategory: ""
    };

    if (this.searchTxt) {
      this.searchParams.searchTxt = this.searchTxt;
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }
    if (this.route.snapshot.queryParams['productCategory'] !== undefined) {
      this.searchParams.productCategory = this.route.snapshot.queryParams['productCategory'];
      this.homeService.productCategory = this.route.snapshot.queryParams['productCategory'];
    }
    else if (this.homeService.productCategory) {
      this.searchParams.productCategory = this.homeService.productCategory;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    this.currentUrl = window.location.href;
    this.totalRecords = 0;
    this.isLoading = true;
    this.productService.getCategoryListFiltered(this.searchParams.searchTxt).subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
        if (this.searchParams.productCategory) {
          this.showingProduct = this.catsList.find(cat => cat.id === this.searchParams.productCategory).name;
        } else {
          this.showingProduct = "All Products";
        }
      }
      this.isLoading = false;
    });
    this.showProducts();
  }

  changePage(page: number) {
    this.searchParams.p = page;
    if (this.showPagination) {
      this.router.navigate(['/products'], { queryParams: { productCategory: this.searchParams.productCategory, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p } });
    }
    else {
      this.showProducts();
    }
  }

  showProducts() {
    this.showResult = false;
    this.isLoading = true;
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
        this.totalRecords = data.total;
        this.showCount.emit(this.totalRecords);
        this.isLoading = false;
      }
    });
    this.shareMedia.setsharemedia(window.location.href)
  }

  onTabChange(value) {
    this.searchParams.productCategory = value;
    this.homeService.productCategory = value;
    if (this.showPagination) {
      this.router.navigate(['/products'], { queryParams: { productCategory: value, searchTxt: this.searchParams.searchTxt } });
    }
    else {
      this.showProducts();
    }
  }

  clearSelection() {
    this.searchParams.productCategory = '';
    this.homeService.productCategory = '';
    this.searchParams.p = 0;
    if (this.showPagination) {
      this.router.navigate(['/products'], { queryParams: { searchTxt: this.searchParams.searchTxt, productCategory: this.searchParams.productCategory } });
    }
    else {
      this.showProducts();
    }
  }

  applyFilter() {
    UIkit.modal('#product-mobile-category-modal').hide();
    if (this.searchParams.productCategory) {
      this.router.navigate(['/products'], { queryParams: { productCategory: this.searchParams.productCategory, searchTxt: this.searchParams.searchTxt } });
    } else {
      this.clearSelection();
    }
  }
}