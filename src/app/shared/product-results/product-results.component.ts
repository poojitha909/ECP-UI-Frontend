import { Component, OnInit, Input, Output, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../features/products/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
declare var UIkit: any;
@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss']
})
export class ProductResultsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
  @Input() searchTxt: string;
  @Output() showCount: EventEmitter<number> = new EventEmitter();
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };

  

  showResult:boolean;
  productsList: any[];
  catsList: any[];
  
  
  currentUrl: string;
  showingProduct: string;
  paramsSubs: any;
  totalRecords: number;
  
  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, public sanitizer: DomSanitizer,
    private homeService: HomeService, public seoService: SeoService) {
  }

  ngOnInit() {
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

    if(this.searchTxt){
      this.searchParams.searchTxt = this.searchTxt;
    }

    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
        this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }
    if (this.route.snapshot.queryParams['productCategory'] !== undefined) {
        this.searchParams.productCategory = this.route.snapshot.queryParams['productCategory'];
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
        this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    this.currentUrl = window.location.href;
    this.totalRecords = 0;
    if (this.route.snapshot.queryParams['productCategory'] !== undefined) {
        this.searchParams.productCategory = this.route.snapshot.queryParams['productCategory'];
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
        this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
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
    });
    this.showProducts();
  }

  changePage(page: number) {
    this.searchParams.p = page;
    if(this.showPagination){
        this.router.navigate(['/products'], { queryParams: { productCategory: this.searchParams.productCategory, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p } });
    }
    else{
        this.showProducts();
    }
  }

  showProducts() {
    this.showResult = false;
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
        const data = response.data;
        this.productsList = [];
        if (data.content) {
          this.productsList = data.content;
          this.totalRecords = data.total;
          this.showCount.emit(this.totalRecords);
        }
    });
  }

  onTabChange(value) {
    this.searchParams.productCategory = value;
    if(this.showPagination){
        this.router.navigate(['/products'], { queryParams: { productCategory: value, searchTxt: this.searchParams.searchTxt } });
    }
    else{
        this.showProducts();
    }
  }

  clearSelection() {
    this.searchParams.productCategory = '';
    this.searchParams.p = 0;
    if(this.showPagination){
        this.router.navigate(['/products'], { queryParams: { searchTxt: this.searchParams.searchTxt } });
    }
    else{
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