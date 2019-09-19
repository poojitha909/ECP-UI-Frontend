import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetail, Review } from 'src/app/core/interfaces';
import { EpcServiceService } from '../../epc-service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: ServiceDetail;
  dbReview: Review[] = [];

  constructor(private route: ActivatedRoute, private ecpService: EpcServiceService) { }

  ngOnInit() {
    this.service = this.route.snapshot.data.detail;

    console.log(this.service);
    if (this.service.email) {
      this.service.email = this.service.email.replace(",", " ");
    }

    if (this.isDBService) {
      this.ecpService.getDBserviceReview(this.service.id, 'false').subscribe(
        response => {
          if (response && response.replies) {
            this.dbReview = response.replies;
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
}
