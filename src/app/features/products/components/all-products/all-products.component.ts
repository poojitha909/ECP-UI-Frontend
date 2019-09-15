import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  showReset: boolean;
  productsList: any[];
  catsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    category: string
  };
  
  paramsSubs: any;
  totalRecords: number;

  constructor(private route:ActivatedRoute,private productService: ProductService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 2,
      searchTxt: "",
      category: ""
    }
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    }); 
  }
  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.searchParams = {
      p: 0,
      s: 10,
      searchTxt: "",
      category: ""
    }
    
    this.totalRecords = 0;
    
    if(this.route.snapshot.params['category'] !== undefined){
      this.searchParams.category = this.route.snapshot.params['category'];
    }
    this.onSearch();
    this.productService.getCategoryList().subscribe( (response:any) =>{
      const data = response.data;
      this.catsList = [];
      if(data.content){
        this.catsList = data.content;
      }
    });
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  showProducts(){
    this.productService.searchProducts(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.productsList = [];
      if(data.content){
        this.productsList = data.content;
        this.totalRecords = data.total;
      }
    });
  }

  onTabChange(value) {
    this.searchParams.p = 0;
    this.showProducts();
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    if(event.key === "Enter"){
      this.onSearch();    
    }
  }

  resetSearch(event: any) {
    if(event.clientX!=0){ // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.showProducts();
  }

}
