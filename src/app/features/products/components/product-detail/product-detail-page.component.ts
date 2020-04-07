import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { ProductService } from '../../services/products.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO, DBReviews, DBRating } from 'src/app/core/interfaces';
import { SeoService } from 'src/app/core/services/seo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
declare var UIkit;

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
    }
  ];

  productId: string;
  product: any;
  user: any;
  reviews: any[] = [];
  dbRating: DBRating[] = [];
  reviewId: string;
  replyParentUser: string;
  replyParentText: string;
  activeSlideId: string;
  currentUrl: string;
  whatsappUrl;
  whatsappMobileUrl;
  userId: string;
  reviwePaginate: any;
  totalReviewRecords: number;
  reviewSuccessMessage: string;
  reviewTitle: string = 'Add';
  detailReview: any;
  userRating:DBRating;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: StorageHelperService,
    private authService: AuthService,
    private seoService: SeoService,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public auth: AuthService
  ) {

    if (this.productService.selectedCatId && this.productService.selectedCatname) {
      this.breadcrumbLinks[2] = {
        text: '',
        link: '/products'
      };
      this.breadcrumbLinks[2].text = this.productService.selectedCatname;
      this.breadcrumbLinks[2].queryParams = { productCategory: this.productService.selectedCatId };
    }

    if (this.auth.isAuthenticate && this.auth.user) {
      this.userId = this.auth.user.id;
    }

    this.reviwePaginate = {
      p: 0,
      s: 2
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
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.whatsappMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);

    let review = this.store.retrieve("new-p-review");
    if (review) {
      review = JSON.parse(review);
    }
    this.reviewForm = this.fb.group({
      productId: [this.productId],
      review: [review ? review.review : "", Validators.required],
      title: [review ? review.title : "", Validators.required],
      id: [""]
    });
    if(review){
      this.store.clear("new-p-review");
      setTimeout( () => {
        UIkit.modal("#review-modal").show();
      },500);
    }

  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe((response: any) => {
      const data = response.data;
      if (data) {
        this.product = data;
        this.getReviews();
        this.getProductRating();
        this.setSeoTags(this.product);
      }
    });
  }

  setSeoTags(product: any) {
    const config: SEO = {
      title: `Shop Easy - ${product.name} - An Elder Spring Initiative by Tata Trusts`,
      keywords: 'products,services,events,dscussions',
      description: `${product.description}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${product.images ? product.images[0] : window.location.origin + '/assets/imgaes/landing-img/Product-320.png'}`,
    }

    this.seoService.generateTags(config);
  }

  redirectToSite(){
    window.open(this.product.buyLink);
  }
  redirectConfirm(){
    if(this.user){
      UIkit.modal("#modal-product-leaving").show();
    }
    else{
      this.authService.redirectUrl = "/products/" + this.product.id;
      this.router.navigate(['/user/signin']);
    }
  }

  getReviews() {
    this.productService.getReviewList(this.productId, this.reviwePaginate).subscribe((response: any) => {
      if (response.data && response.data.content) {
        this.reviews = response.data.content;
        this.totalReviewRecords = response.data.total;
      }
    });
  }

  /**
   * Get Product rating 
   */
  getProductRating() {
    this.productService.getRatings(this.productId).subscribe(
      response => {
        if (response) {
          this.dbRating = response;
           if (this.auth.user) {
            this.userRating = this.dbRating.find(val => val.userId == this.userId);
          }
          this.getDetailRating();
        }
      });
  }

    /**
   * Add rating 
   */
  onRatingSubmit(ratingData: any) {
    ratingData["productId"] = this.productId;
    if (this.auth.isAuthenticate) {
      if (this.userRating) {
        this.dbRating = this.dbRating.filter(val => val.userId !== this.userRating.userId);
        this.userRating = null;
      } else {
        if (ratingData.rating && this.auth.user) {
          ratingData.rating = this.getRatingValue(ratingData.rating);
          this.productService.addRating(ratingData).subscribe(
            response => {
              this.userRating = response;
              this.dbRating.push(response);
              this.getDetailRating()
            },
            error => {
              console.log(error);
            });
        }
      }
    } else {
      this.auth.redirectUrl = this.router.url;
      this.router.navigateByUrl('/user/signin');
    }
  }

  getRatingValue(rating: number): number {
    switch (rating) {
      case 1:
        return 20
      case 2:
        return 40
      case 3:
        return 60
      case 4:
        return 80
      case 5:
        return 90
    }
  }

  getDetailRating() {

    this.detailReview = {
      totalCount: 0,
      rating: 0,
      fiveStar: {
        count: 0
      },
      fourStar: {
        count: 0
      },
      threeStar: {
        count: 0
      },
      twoStar: {
        count: 0
      },
      oneStar: {
        count: 0
      }
    };

    this.detailReview.totalCount = this.dbRating.length;
    if (this.dbRating.length > 0) {
      let totalrating = 0;
      this.dbRating.forEach(rate => {
        totalrating += rate.rating;
      })

      totalrating = totalrating / this.dbRating.length;
      this.detailReview.rating = this.getDbServiceRating(totalrating);
    }

    if (this.dbRating.length > 0) {
      this.detailReview.fiveStar.count += this.dbRating.filter(val => this.getDbServiceRating(val.rating) === 5).length;
      this.detailReview.fourStar.count += this.dbRating.filter(val => this.getDbServiceRating(val.rating) === 4).length;
      this.detailReview.threeStar.count += this.dbRating.filter(val => this.getDbServiceRating(val.rating) === 3).length;
      this.detailReview.twoStar.count += this.dbRating.filter(val => this.getDbServiceRating(val.rating) === 2).length;
      this.detailReview.oneStar.count += this.dbRating.filter(val => this.getDbServiceRating(val.rating) === 1).length;

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

  /**
  * Add review
  */
  onReviewSubmit() {
      if (this.auth.isAuthenticate) {
        this.reviewSuccessMessage = null;
        this.reviewForm.controls.productId.setValue(this.productId);
        this.productService.addReview(this.reviewForm.value).subscribe(
          response => {
            if (response) {
              this.getReviews();
              this.reviewForm.reset();
              this.reviewSuccessMessage = "Review successfully posted.";
            }
          },
          error => {
            console.log(error);
          });
      } else {
        console.log(this.reviewForm.value);
        this.store.store("new-p-review", JSON.stringify(this.reviewForm.value));
        this.authService.redirectUrl = "products/" + this.productId;
        this.router.navigate(['/user/signin']);
      }
  }

  // likeReply(reply) {
  //   // this.productService.likeReply(this.productId,reply.id).subscribe( (response:any) =>{
  //   //   if(response.data.id){
  //   //     for(let idx in this.reviews){
  //   //       if(this.reviews[idx].id === response.data.id){
  //   //         this.reviews[idx] = response.data;
  //   //       }
  //   //     }
  //   //   }
  //   // });
  // }

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

  likeUnlikeReview(reviewId: string) {
    this.productService.likeUnlikeReview(reviewId).subscribe(
      response => {
        if (response) {
          const index = this.reviews.findIndex(val => val.id === reviewId);
          this.reviews[index].likeCount = response.likeCount;
        }
      },
      error => {
        console.log(error);
      });
  }

  editReview(review: DBReviews) {
    //console.log(review,"rev");
    this.reviewSuccessMessage = null;

    this.reviewForm.patchValue(review);
    this.reviewTitle = "Edit";
    UIkit.modal("#review-modal").show();

  }

  changeReviewPage(page: number) {
    this.reviwePaginate.p = page;
    this.getReviews();
  }

}