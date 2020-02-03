import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/features/products/services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  searchParams = {
    p: 0,
    s: 6,
    searchTxt: '',
    productCategory: ''
  };
  productsList: any[];
  productsTotal: number;
  catsList: any[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initiate();
  }

  initiate(){
    this.productService.getCategoryList().subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
      }
      this.showProducts();
    });
  }

  showProducts() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParams));
    searchParams.searchTxt = "";
    this.productService.searchProducts(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
      }
      this.productsTotal = data.total;
    });
  }

}
