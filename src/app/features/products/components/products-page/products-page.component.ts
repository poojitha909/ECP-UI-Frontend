import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  showReset: boolean;
  productsList: any[];
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };


  constructor(private productService: ProductService, private router: Router) {
    this.productService.selectedCatId = null;
    this.productService.selectedCatname = null;
  }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 3,
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

    this.showProducts();
  }

  showProducts() {
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
      }
    });
  }

  showAllProducts(){
    this.router.navigate(['/products/all'], {queryParams: {productCategory: this.searchParams.productCategory, searchTxt:  this.searchParams.searchTxt}});
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    if (event.key == "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.showProducts();
  }
}