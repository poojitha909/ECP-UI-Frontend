import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDetail, DBReviews } from 'src/app/core/interfaces';
import { EpcServiceService } from '../../epc-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: ServiceDetail;
  dbReview: DBReviews[] = [];
  reviewForm: FormGroup;
  reportForm: FormGroup;
  successMessage: string;
  reviewSuccessMessage: string;
  currentUrl: string;
  whatsappUrl;
  constructor(
    private route: ActivatedRoute,
    private ecpService: EpcServiceService,
    private router: Router,
    private fb: FormBuilder,
    public auth: AuthService,
    public sanitizer: DomSanitizer
  ) {
    this.reviewForm = this.fb.group({
      serviceId: [""],
      rating: [0, Validators.required],
      review: ["", Validators.required],
      userName: ["", Validators.required]
    });

    this.reportForm = this.fb.group({
      serviceId: [""],
      cause: [0, Validators.required],
      comment: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.service = this.route.snapshot.data.detail;
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
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${this.currentUrl}`);
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }

  getDBserviceReview(serviceId) {
    this.ecpService.getDBserviceReview(serviceId).subscribe(
      response => {
        if (response && response.content) {
          this.dbReview = response.content;
          console.log(this.dbReview, this.isDBService);
        }
      });
  }


  getDbServiceRating(percent): number {

    if (percent <= 20) {
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

  login() {
    this.auth.redirectUrl = this.router.url;
    this.auth.serviceReviewForm = this.reviewForm.value;
    this.router.navigateByUrl('/user/signin');

  }
}
