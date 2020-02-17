import { Component, OnInit } from '@angular/core';
import { EpcServiceService } from 'src/app/features/services/epc-service.service';
import { Service, PageParam } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { StorageHelperService } from 'src/app/core/services';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-services',
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit {

  services: Service[] = [];
  category: string = "";
  constructor(
    private ecpService: EpcServiceService,
    private homeService: HomeService,
    private storageHelper: StorageHelperService,
    private router: Router
  ) { }

  ngOnInit() {
    const featuredServiceSession = this.storageHelper.retrieveSession(AppConstants.FEATURED_SERVICE);
    if (featuredServiceSession) {
      this.category = featuredServiceSession;
      this.searchByCategories();
    } else {
      this.getFeatureServices();
    }
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

  searchByCategories() {
    if (this.category) {
      const searchParam: PageParam = {
        p: 1,
        s: 5,
        term: this.category
      };

      this.homeService.getFeaturedServices(searchParam).subscribe(
        response => {
          if (response && response.data) {
            this.services = response.data.slice(0, 6);
          }
        });
    } else {
      this.getFeatureServices();
    }
  }

  seeAllServices() {
    this.storageHelper.storeSession(AppConstants.FEATURED_SERVICE, this.category);
    this.router.navigate(["/services/all"], { queryParams: { category: this.category } });
  }
}
