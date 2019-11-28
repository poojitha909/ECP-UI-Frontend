import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  showReset: boolean;
  showResult: boolean;
  productsList: any[];
  productsTotal: number;
  productsList2: any[];
  productsTotal2: number;
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };


  constructor(
    private productService: ProductService, private router: Router,
    private homeService: HomeService, private seoService: SeoService
  ) {
    this.productService.selectedCatId = null;
    this.productService.selectedCatname = null;

    // Generate meta tag 
    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Products`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Product-320.png`,
    }

    this.seoService.generateTags(config);
  }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 6,
      searchTxt: "",
      productCategory: ""
    }

    this.productService.getCategoryList().subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
      }
    });

    this.showResult = false;
    this.showProducts2();
    if (this.homeService.homeSearchtxt) {
      this.searchParams.searchTxt = this.homeService.homeSearchtxt;
      if (this.homeService.storageSearchResult) {
        const searchData: any = this.homeService.storageSearchResult;
        this.productsList = searchData.products;
        this.showResult = true;
      }
      this.showReset = true;
    }
  }

  showProducts() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParams));
    searchParams.productCategory = "";
    this.productService.searchProducts(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
      }
      this.productsTotal = data.total;
    });
  }

  showAllProducts() {
    this.router.navigate(['/products/all'], { queryParams: { productCategory: this.searchParams.productCategory, searchTxt: this.searchParams.searchTxt } });
  }

  showProducts2() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParams));
    searchParams.searchTxt = "";
    this.productService.searchProducts(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList2 = [];
      if (data.content) {
        this.productsList2 = data.content;
      }
      this.productsTotal2 = data.total;
    });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
      this.showResult = false;
    }
    this.searchParams.searchTxt = value;
    if (event.key == "Enter") {
      this.onSearch();
    }
  }
  getDbServiceRating(percent): number {
    if (percent == 0) {
      return 0;
    } else if (percent <= 20) {
      return 1;
    } else if (percent <= 40) {
      return 2;
    } else if (percent <= 60) {
      return 3;
    } else if (percent <= 80) {
      return 4;
    } else if (percent <= 100) {
      return 5;
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.showReset = false;
      // this.onSearch()
    }
  }

  onSearch() {
    this.showResult = false;
    if (this.searchParams.searchTxt != "") {
      this.showResult = true;
    }
    this.homeService.clearHomepageSearch();
    this.showProducts();
  }
}