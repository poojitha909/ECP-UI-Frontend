import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
declare var UIkit: any;
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

  showResult:boolean;
  showReset: boolean;
  productsList: any[];
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    productCategory: string
  };
  currentUrl: string;
  showingProduct: string;
  paramsSubs: any;
  totalRecords: number;
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 1 };
  initial:number;
  final:number;
  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, public sanitizer: DomSanitizer,
    private homeService: HomeService, public seoService: SeoService) {
    // Generate meta tag 
    const config: SEO = {
      title: `All Products - An Elder Spring Initiative by Tata Trusts`,
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
    this.currentUrl = window.location.href;
    this.searchParams = {
      p: 0,
      s: 4,
      searchTxt: "",
      productCategory: ""
    }

    this.totalRecords = 0;
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
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
    this.onSearch()
  }

  showProducts() {
    this.showResult = false;
    this.productService.searchProducts(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.productsList = [];
      if (data.content) {
        this.productsList = data.content;
        this.totalRecords = data.total;
        this.initial = this.searchParams.p * this.searchParams.s + 1;
        this.final = this.initial + this.productsList.length - 1;
      }
    });
  }

  clearSelection() {
    this.productService.selectedCatId = null;
    this.productService.selectedCatname = null;
    this.searchParams.productCategory = '';
    this.router.navigateByUrl('products');
  }

  onTabChange(value, catName) {
    this.productService.selectedCatId = value;
    this.productService.selectedCatname = catName;
    this.router.navigate(['/products'], { queryParams: { productCategory: value, searchTxt: this.searchParams.searchTxt } });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.setSearchTxt(value);
    if (event.key === "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.onSearch()
    }
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
    this.searchParams.p = 0;
  }


  onSearch() {
    this.router.navigate(['/products/all'], { queryParams: { productCategory: this.searchParams.productCategory, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p } });
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
