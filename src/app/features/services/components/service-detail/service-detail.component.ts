import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDetail, DBReviews, SEO, Breadcrumb } from 'src/app/core/interfaces';
import { EpcServiceService } from '../../epc-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';


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
  successMessage: string;
  reviewSuccessMessage: string;
  currentUrl: string;
  whatsappUrl;

  detailReview = {
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

  constructor(
    private route: ActivatedRoute,
    private ecpService: EpcServiceService,
    private router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    public sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {
    this.service = this.route.snapshot.data.detail;
    this.reviewForm = this.fb.group({
      serviceId: [""],
      rating: [0, Validators.required],
      review: ["", Validators.required],
      // userName: ["", Validators.required]
    });

    this.reportForm = this.fb.group({
      serviceId: [""],
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

    if (this.isDBService) {
      this.getDBserviceReview(this.service.id);
    } else {
      const docId: string = this.route.snapshot.params['docId'];
      this.getDBserviceReview(docId);
    }

    if (this.auth.serviceReviewForm) {
      this.reviewForm.patchValue(this.auth.serviceReviewForm);
      this.auth.removeServiceReviewForm();
    }

    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }

  /**
   * 
   *Get Service Review from DB
   */
  getDBserviceReview(serviceId) {
    this.ecpService.getDBserviceReview(serviceId).subscribe(
      response => {
        if (response && response.content) {
          this.dbReview = response.content;
          this.getDetailReview();
          console.log(this.detailReview);
          console.log(this.dbReview, this.isDBService);
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

  onReviewSubmit() {
    if (this.reviewForm.valid) {

      if (this.auth.isAuthenticate) {
        if (this.isDBService) {
          this.reviewForm.controls.serviceId.setValue(this.service.id);
        } else {
          const docId: string = this.route.snapshot.params['docId'];
          this.reviewForm.controls.serviceId.setValue(docId);
        }
        this.reviewSuccessMessage = null;
        this.ecpService.addDBserviceReview(this.reviewForm.value).subscribe(
          response => {
            if (response) {
              this.dbReview.push(response);
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
      if (this.isDBService) {
        this.reportForm.controls.serviceId.setValue(this.service.id);
      } else {
        const docId: string = this.route.snapshot.params['docId'];
        this.reportForm.controls.serviceId.setValue(docId);
      }
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

  getDetailReview() {
    this.isDBService ? this.detailReview.totalCount = this.dbReview.length : this.detailReview.totalCount = this.service.Reviews.length + this.dbReview.length;
    this.isDBService ? this.detailReview.rating = this.getDbServiceRating(this.service.aggrRatingPercentage) : this.detailReview.rating = parseFloat(this.service.rating);

    if (this.dbReview.length > 0) {
      this.detailReview.fiveStar.count += this.dbReview.filter(val => this.getDbServiceRating(val.rating) === 5).length;
      this.detailReview.fourStar.count += this.dbReview.filter(val => this.getDbServiceRating(val.rating) === 4).length;
      this.detailReview.threeStar.count += this.dbReview.filter(val => this.getDbServiceRating(val.rating) === 3).length;
      this.detailReview.twoStar.count += this.dbReview.filter(val => this.getDbServiceRating(val.rating) === 2).length;
      this.detailReview.oneStar.count += this.dbReview.filter(val => this.getDbServiceRating(val.rating) === 1).length;

    }

    if (!this.isDBService && this.service.Reviews.length > 0) {

      this.detailReview.fiveStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 5).length;
      this.detailReview.fourStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 4).length;
      this.detailReview.threeStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 3).length;
      this.detailReview.twoStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 2).length;
      this.detailReview.oneStar.count += this.service.Reviews.filter(val => Math.round(parseInt(val.review_rate)) === 1).length;

    }

  }

  login() {
    this.auth.redirectUrl = this.router.url;
    this.auth.serviceReviewForm = this.reviewForm.value;
    this.router.navigateByUrl('/user/signin');
  }


  likeUnlikeReview(review: DBReviews, like: boolean) {
    this.ecpService.likeUnlikeReview(review.id, like).subscribe(
      response => {
        if (response) {
          const index = this.dbReview.findIndex(val => val.id === review.id);
          this.dbReview[index] = response;
        }
      },
      error => {
        console.log(error);
      });
  }

}
