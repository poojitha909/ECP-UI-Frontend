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
    s: 20,
  };
  products: any[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      if (data.content) {
        this.products = data.content;
      }
    });
  }

}
