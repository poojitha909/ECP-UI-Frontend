import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDetail, DBReviews } from 'src/app/core/interfaces';
import { EpcServiceService } from '../../epc-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: ServiceDetail;
  dbReview: DBReviews[] = [];
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ecpService: EpcServiceService,
    private router: Router,
    private fb: FormBuilder,
    public auth: AuthService
  ) {

    this.reviewForm = this.fb.group({
      serviceId: [""],
      rating: [0, Validators.required],
      review: ["", Validators.required],
      userName: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.service = this.route.snapshot.data.detail;

    console.log(this.service);
    if (this.service.email) {
      this.service.email = this.service.email.replace(",", " ");
    }

    if (this.isDBService) {
      this.ecpService.getDBserviceReview(this.service.id).subscribe(
        response => {
          if (response && response.content) {
            this.dbReview = response.content;
            console.log(this.dbReview, this.isDBService);
          }
        });
    }

  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
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
      this.reviewForm.controls.serviceId.setValue(this.service.id);
      this.ecpService.addDBserviceReview(this.reviewForm.value).subscribe(
        response => {
          if (response) {
            this.dbReview.push(response);
            this.reviewForm.reset();
          }
        },
        error => {
          console.log(error);
        });
      console.log(this.reviewForm.value);

    }
  }

  login() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/user/signin');
  }
}
