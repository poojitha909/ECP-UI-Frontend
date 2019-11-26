import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';
import { StorageHelperService } from 'src/app/core/services';

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


  constructor(private productService: ProductService, private router: Router, private storageHelper: StorageHelperService) {
    this.productService.selectedCatId = null;
    this.productService.selectedCatname = null;
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
    // this.showProducts();
    this.showProducts2();
    const homeSearchtxt = this.storageHelper.retrieveSession('homeSearchText');
    if (homeSearchtxt) {
      this.searchParams.searchTxt = homeSearchtxt;
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
    this.storageHelper.clearSession('homeSearchText');
    this.showProducts();
  }
}