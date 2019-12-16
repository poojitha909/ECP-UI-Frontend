import { Component, OnInit } from '@angular/core';
import { EpcServiceService } from 'src/app/features/services/epc-service.service';
import { Service } from 'src/app/core/interfaces';

@Component({
  selector: 'app-featured-services',
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit {

  services: Service[] = [];
  constructor(private ecpService: EpcServiceService) { }

  ngOnInit() {
    this.getFeatureServices();
  }

  getFeatureServices() {
    this.ecpService.serviceParam.max = 5;
    this.ecpService.getAllServices().subscribe(
      response => {
        this.ecpService.serviceParam.max = 50;
        if (response) {
          this.ecpService.serviceParam.isFeatured = false;
          this.services = response;
        }
      });
  }

}
