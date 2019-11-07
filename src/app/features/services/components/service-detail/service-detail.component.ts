import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDetail, DBReviews, SEO, Breadcrumb, DBRating } from 'src/app/core/interfaces';
import { EpcServiceService } from '../../epc-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Services',
      link: '/services'
    },
    {
      text: 'All Services',
      link: '/services/all'
    }
  ];
  service: ServiceDetail;
  dbReview: DBReviews[] = [];
  reviewForm: FormGroup;
  reportForm: FormGroup;
  // ratingForm: FormGroup;
  successMessage: string;
  reviewSuccessMessage: string;
  currentUrl: string;
  whatsappUrl;
  docId: string;
  userId: string;
  reviewTitle: string = "Add";
  // deleteReviewId: string;
  detailReview: any;
  jdDetailReview: any;
  userRating: DBRating;
  dbRating: DBRating[] = [];
  reviwePaginate: {
    p: number,
    s: number
  };
  totalReviewRecords: number;

  constructor(
    private route: ActivatedRoute,
    private ecpService: EpcServiceService,
    private router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    public sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {

    this.reviwePaginate = {
      p: 0,
      s: 2
    }

    if (this.auth.isAuthenticate && this.auth.user) {
      this.userId = this.auth.user.id;
    }

    this.docId = this.route.snapshot.params['docId'];

    if (this.ecpService.searchedService && this.ecpService.searchCatID) {

      this.breadcrumbLinks[2].queryParams = { category: this.ecpService.searchedService, catid: this.ecpService.searchCatID };
    } else if (this.ecpService.searchedService) {
      this.breadcrumbLinks[2].queryParams = { category: this.ecpService.searchedService };
    }

    this.service = this.route.snapshot.data.detail;

    this.reviewForm = this.fb.group({
      serviceId: [this.docId],
      review: ["", Validators.required],
      title: ["", Validators.required],
      id: [""]
      // userName: ["", Validators.required]
    });

    this.reportForm = this.fb.group({
      serviceId: [this.docId],
      cause: ["", Validators.required],
      comment: ["", Validators.required],
    });



    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Service ${this.isDBService ? this.service.basicProfileInfo.firstName : this.service.name}`,
      keywords: 'products,services,events,dscussions',
      description: `${this.isDBService ? this.service.basicProfileInfo.description : 'Just Dail Service'}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/service-bg.png`,
    }
    if (this.isDBService && this.service.basicProfileInfo.profileImage && this.service.basicProfileInfo.profileImage.original) {
      config.image = this.service.basicProfileInfo.profileImage.original;
    } else if (!this.isDBService && this.service.disp_pic) {
      config.image = this.service.disp_pic;
    }
    this.seoService.generateTags(config);

  }

  ngOnInit() {
    if (this.service.email) {
      this.service.email = this.service.email.replace(",", " ");
    }

    this.getDBserviceReview(this.docId);
    this.getServiceRating(this.docId);

    if (this.auth.serviceReviewForm) {
      this.reviewForm.patchValue(this.auth.serviceReviewForm);
      this.auth.removeServiceReviewForm();
    }

    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);

    if (!this.isDBService) {
      this.getJdDetailRating();
    }
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }

  /**
   * 
   *Get Service Review from DB
   */
  getDBserviceReview(serviceId) {
    this.ecpService.getDBserviceReview(serviceId, this.reviwePaginate).subscribe(
      response => {
        if (response && response.content) {
          this.dbReview = response.content;
          this.totalReviewRecords = response.total;
          // this.getDetailReview();
        }
      });
  }

  /**
   * Get Service Rating from DB
   * @param serviceId 
   */
  getServiceRating(serviceId) {
    this.ecpService.getServiceRatings(serviceId).subscribe(
      response => {
        if (response) {
          this.dbRating = response;
          console.log(this.dbRating);
          if (this.auth.user) {
            // const userId = this.auth.user.id;
            this.userRating = this.dbRating.find(val => val.userId == this.userId);
          }
          this.getDetailRating();
        }
      });
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

  /**
   * Add rating 
   */
  onRatingSubmit(ratingData: any) {
    ratingData.serviceId = this.docId;
    if (this.auth.isAuthenticate) {
      if (this.userRating) {
        this.dbRating = this.dbRating.filter(val => val.userId !== this.userRating.userId);
        this.userRating = null;
      } else {
        if (ratingData.rating && this.auth.user) {
          ratingData.rating = this.getRatingValue(ratingData.rating);
          this.ecpService.addServiceRating(ratingData).subscribe(
            response => {
              console.log(response);
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

  /**
   * Add review
   */
  onReviewSubmit() {
    if (this.reviewForm.valid) {

      if (this.auth.isAuthenticate) {
        this.reviewSuccessMessage = null;
        this.reviewForm.controls.serviceId.setValue(this.docId);
        this.ecpService.addDBserviceReview(this.reviewForm.value).subscribe(
          response => {
            if (response) {
              // if (this.isDBService) {
              //   let totalrating = 0;
              //   if (this.dbReview.length > 0) {
              //     this.dbReview.forEach(review => {
              //       totalrating += review.rating;
              //     })
              //   }
              //   totalrating += response.rating;
              //   this.service.aggrRatingPercentage = totalrating / (this.dbReview.length + 1);
              // }
              this.getDBserviceReview(this.docId);
              this.reviewForm.reset();
              this.reviewSuccessMessage = "Review successfully posted.";
            }
          },
          error => {
            console.log(error);
          });
        console.log(this.reviewForm.value);
      } else {
        this.login();
      }
    }
  }

  onSubmitReport() {
    if (this.auth.isAuthenticate) {
      this.ecpService.addDBserviceReport(this.reportForm.value).subscribe(
        response => {
          if (response) {
            this.reportForm.reset();
            this.successMessage = "Service report was sent to site admin successfully."
          }
        },
        error => {
          console.log(error);
        });
      console.log(this.reportForm.value);
    } else {
      this.auth.redirectUrl = this.router.url;
      this.router.navigateByUrl('/user/signin');
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
    // if (this.isDBService) {
    //   this.detailReview.rating = this.getDbServiceRating(this.service.aggrRatingPercentage);
    // } else {
    // }
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

  getJdDetailRating() {

    this.jdDetailReview = {
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

    this.jdDetailReview.totalCount = this.service.Reviews.length;
    this.jdDetailReview.rating = parseFloat(this.service.rating);

    if (!this.isDBService && this.service.Reviews.length > 0) {
      this.jdDetailReview.fiveStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 5).length;
      this.jdDetailReview.fourStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 4).length;
      this.jdDetailReview.threeStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 3).length;
      this.jdDetailReview.twoStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 2).length;
      this.jdDetailReview.oneStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 1).length;
    }

  }

  login() {
    this.auth.redirectUrl = this.router.url;
    this.auth.serviceReviewForm = this.reviewForm.value;
    this.router.navigateByUrl('/user/signin');
  }


  likeUnlikeReview(reviewId: string) {
    this.ecpService.likeUnlikeReview(reviewId).subscribe(
      response => {
        if (response) {
          const index = this.dbReview.findIndex(val => val.id === reviewId);
          this.dbReview[index].likeCount = response.likeCount;
        }
      },
      error => {
        console.log(error);
      });
  }

  

  editReview(review: DBReviews) {
    this.reviewSuccessMessage = null;
    this.reviewForm.patchValue(review);
    this.reviewTitle = "Edit";
  }

  // deleteReview() {
  //   this.ecpService.deleteDBserviceReview(this.deleteReviewId).subscribe(
  //     response => {
  //       if (response) {
  //         this.getDBserviceReview(this.docId);
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  changeReviewPage(page: number) {
    this.reviwePaginate.p = page;
    this.getDBserviceReview(this.docId);
  }

}
