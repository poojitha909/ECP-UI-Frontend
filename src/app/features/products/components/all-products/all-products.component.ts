import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { Breadcrumb } from 'src/app/core/interfaces';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {

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

  showReset: boolean;
  productsList: any[];
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };

  paramsSubs: any;
  totalRecords: number;
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 1 };
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 2,
      searchTxt: "",
      productCategory: ""
    }
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }
  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 10,
      searchTxt: "",
      productCategory: ""
    }

    this.totalRecords = 0;
    console.log(this.route.snapshot.params);
    if (this.route.snapshot.params['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.params['searchTxt'];
    }
    if (this.route.snapshot.params['productCategory'] !== undefined) {
      this.searchParams.productCategory = this.route.snapshot.params['productCategory'];
    }
    this.onSearch();
    this.productService.getCategoryList().subscribe((response: any) => {
      const data = response.data;
      this.catsList = [];
      if (data.content) {
        this.catsList = data.content;
      }
    });
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  showProducts() {
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
        this.totalRecords = data.total;
      }
    });
  }

  clearSelection() {
    this.searchParams.productCategory = '';
    this.router.navigateByUrl('products/all');
  }

  onTabChange(value) {
    this.router.navigate(['/products/all', { productCategory: value, searchTxt: this.searchParams.searchTxt }]);
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    if (event.key === "Enter") {
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
