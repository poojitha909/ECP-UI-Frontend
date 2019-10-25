import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { ProductService } from '../../services/products.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { SeoService } from 'src/app/core/services/seo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Products',
      link: '/products'
    },
    {
      text: 'All Products',
      link: '/products/all'
    }
  ];

  productId: string;
  product: any;
  user: any;
  reviews: any[];
  reviewId: string;
  replyParentUser: string;
  replyParentText: string;
  activeSlideId: string;
  currentUrl: string;
  whatsappUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: StorageHelperService,
    private authService: AuthService,
    private seoService: SeoService,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {

    if (this.productService.selectedCatId && this.productService.selectedCatname) {
      this.breadcrumbLinks[2].text = this.productService.selectedCatname;
      this.breadcrumbLinks[2].queryParams = { productCategory: this.productService.selectedCatId };
    }
  }
  reviewForm: FormGroup;
  successMessage: String;


  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.successMessage = "";
    this.getProduct()
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.reviewForm = this.fb.group({
      commentTxt: ["", Validators.required],
      rating: ["", Validators.required],
      username: ["", Validators.required]
    });
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe((response: any) => {
      const data = response.data;
      if (data) {
        this.product = data;
        this.getReviews();
        this.setSeoTags(this.product);
      }
    });
  }

  setSeoTags(product: any) {
    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Product ${product.name}`,
      keywords: 'products,services,events,dscussions',
      description: `${product.description}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${product.images ? product.images[0] : window.location.origin + '/assets/imgaes/landing-img/product-bg.png'}`,
    }

    this.seoService.generateTags(config);
  }

  getReviews() {
    this.productService.getReviewList(this.productId).subscribe((response: any) => {
      if (response.data && response.data.content) {
        this.reviews = response.data.content;
      }
    });
  }

  addComment() {
    Object.keys(this.reviewForm.controls).forEach(field => {
      const control = this.reviewForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let review = { ...this.reviewForm.value };
    if (!this.reviewForm.valid) {
      return;
    }
    if (!this.user) {
      this.store.store("new-p-comment", JSON.stringify({ productId: this.productId, commentTxt: review.commentTxt, username: review.username, rating: review.rating }));
      this.authService.redirectUrl = "product/" + this.productId;
      this.router.navigate(['/user/signin']);
      return;
    }
    this.productService.addComment(this.productId, review.commentTxt, review.username, review.rating).subscribe((response: any) => {
      if (response.data) {
        this.successMessage = "Review Submitted successfully.";
        this.reviewForm.reset();
        this.getReviews();
      }
    });
  }

  likeReply(reply) {
    // this.productService.likeReply(this.productId,reply.id).subscribe( (response:any) =>{
    //   if(response.data.id){
    //     for(let idx in this.reviews){
    //       if(this.reviews[idx].id === response.data.id){
    //         this.reviews[idx] = response.data;
    //       }
    //     }
    //   }
    // });
  }

  setReplyId(id: string, user: string, text: string) {
    this.reviewId = id;
    this.replyParentUser = user;
    this.replyParentText = text;
  }

  setActiveSlide(id: number) {
    this.activeSlideId = "ngb-slide-" + id;
  }
  get formControl() {
    return this.reviewForm.controls;
  }

}