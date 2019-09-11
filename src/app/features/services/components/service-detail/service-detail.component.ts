import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetail } from 'src/app/core/interfaces';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: ServiceDetail;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.service = this.route.snapshot.data.detail;

    console.log(this.service);
    if (this.service.email) {
      this.service.email = this.service.email.replace(",", " ");
    }
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }
}
