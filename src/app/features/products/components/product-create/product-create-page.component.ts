import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/products.service';
import {Router} from "@angular/router";
import {StorageHelperService} from "../../../../core/services/storage-helper.service";
import {AuthService} from "../../../../core/auth/services/auth.service";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent implements OnInit {

  categoryList: any[];
  name: string;
  productCategory: string;
  shortDescription: string;
  description: string;
  isFeatured: number;
  rating: number;
  reviews: number;
  price: number;
  status: number;
  buyLink: string;
  buyFrom: string;
  images: string;
  user: any;

  constructor(private router: Router, private productService: ProductService, private store: StorageHelperService, private authService: AuthService) { }

  ngOnInit() {
    this.categoryList = [];
    this.name = "";
    this.productCategory = "",
    this.shortDescription = "";
    this.description = "";
    this.isFeatured = 0;
    this.rating = 0;
    this.reviews = 0;
    this.price = 0;
    this.status = 0;
    this.buyLink = "";
    this.buyFrom = "";
    this.images = "";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
    }
    this.productService.getCategoryList().subscribe( (response:any) =>{
      const data = response.data;
      this.categoryList = [];
      if(data.content){
        this.categoryList = data.content;
      }
    });
    let product = this.store.retrieve("new-product");
    if(product){
      product = JSON.parse(product);
      this.name = product.name;
      this.productCategory = product.productCategory;
      this.shortDescription = product.shortDescription;
      this.description = product.description;
      this.isFeatured = product.isFeatured;
      this.rating = product.rating;
      this.reviews = product.reviews;
      this.price = product.price;
      this.status = product.status;
      this.buyLink = product.buyLink;
      this.buyFrom = product.buyFrom;
      this.images = product.images;
      this.store.clear("new-product");
    }
  }

  onReset(){
    this.name = "";
    this.productCategory = "",
    this.shortDescription = "";
    this.description = "";
    this.isFeatured = 0;
    this.rating = 0;
    this.reviews = 0;
    this.price = 0;
    this.status = 0;
    this.buyLink = "";
    this.buyFrom = "";
    this.images = "";
    this.router.navigate(['/products']);
  }
  
  onSubmit(){
    if(!this.user){
      this.store.store("new-product", JSON.stringify(
        { 
          name: this.name,
          productCategory: this.productCategory,
          shortDescription: this.shortDescription,
          description: this.description,
          isFeatured: this.isFeatured,
          rating: this.rating,
          reviews: this.reviews,
          price: this.price,
          status: this.status,
          buyLink: this.buyLink,
          buyFrom: this.buyFrom,
          images: this.images
        }
      ));
      this.authService.redirectUrl = "/product/add";
      this.router.navigate(['/user/signin']);
      return;
    }
    
    if(this.name!= "" && this.description != "" && this.price > 0){
      this.productService.addProduct({
          name: this.name,
          productCategory: {"id": this.productCategory},
          shortDescription: this.shortDescription,
          description: this.description,
          isFeatured: this.isFeatured,
          rating: this.rating,
          reviews: this.reviews,
          price: this.price,
          status: this.status,
          buyLink: this.buyLink,
          buyFrom: this.buyFrom,
          images: (this.images!=undefined && this.images!="") ? this.images.replace(/ /g, '').split(",") : []
        }).subscribe( (response:any) => {
        if(response.data.id != ""){
          this.router.navigate(['/products']);
        }
        else{
          alert("Oops! something wrong happen, please try again.");            
        }
      });
    }
    else{
      alert("All fields are required, please fill all fields.");
    }
  }
}