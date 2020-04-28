import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Products',
      link: '/products'
    }
  ];
  showSharing: boolean;
  showPagination: boolean;
  showReset: boolean;
  searchTxt: string;
  tempSearchTxt: string;
  productCategory: string;
  currentUrl: string;
  showingProduct: string;
  paramsSubs: any;
  totalRecords: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, public sanitizer: DomSanitizer,
    private homeService: HomeService, public seoService: SeoService) {
    // Generate meta tag 
    const config: SEO = {
      title: `All Products`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Product-320.png`,
    }
    this.seoService.generateTags(config);
  }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    document.getElementById("productSearch").focus();
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.currentUrl = window.location.href;
    this.showPagination = true;
    this.showSharing = true;
    this.searchTxt = "";

    this.totalRecords = 0;
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchTxt ? true : false;
    }
    if (this.route.snapshot.queryParams['productCategory'] !== undefined) {
      this.productCategory = this.route.snapshot.queryParams['productCategory'];
    }
    if (!this.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    if (event.key === "Enter" || value == "") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    // if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
    this.setSearchTxt("");
    this.productCategory = "";
    this.homeService.productCategory = '';
    this.showReset = false;
    this.onSearch()
    // }
  }

  setSearchTxt(value: string) {
    this.searchTxt = value;
    this.tempSearchTxt = value;
    this.homeService.homeSearchtxt = value;
  }

  onSearch() {
    this.setSearchTxt(this.tempSearchTxt);
    document.getElementById("productSearch").focus();
    this.homeService.productCategory = '';
    this.router.navigate(['/products'], { queryParams: { searchTxt: this.searchTxt } });
  }

  showProductCount(value) {
    this.totalRecords = value;
  }
}