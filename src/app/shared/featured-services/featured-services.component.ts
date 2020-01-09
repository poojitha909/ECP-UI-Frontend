import { Component, OnInit } from '@angular/core';
import { EpcServiceService } from 'src/app/features/services/epc-service.service';
import { Service } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-featured-services',
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit {

  services: Service[] = [];
  category: string;
  constructor(private ecpService: EpcServiceService, private homeService: HomeService) { }

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

  searchByCategories(category) {
    if (category) {
      this.category = category;
      this.homeService.searchParam.term = category;
      this.homeService.getServices().subscribe(
        response => {
          if (response && response.data) {
            this.services = response.data.slice(0, 6);
          }
        });
    }
    // console.log(category.text);
  }
}
