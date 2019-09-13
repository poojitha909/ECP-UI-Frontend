import { Component, OnInit } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service, PageParam } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';
import { HomeService } from 'src/app/features/home/home.service';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit {
  services: Service;

  constructor(public ecpService: EpcServiceService, public JDcategory: JdCategoryService, private homeService: HomeService) { }

  ngOnInit() {

    if (this.homeService.selectedCategory) {
      this.getCategoryServices(this.homeService.selectedCategory);
      this.homeService.selectedCategory = undefined;
    } else {
      this.getAllService();
    }
  }

  getAllService() {
    this.ecpService.getAllServices().subscribe(
      response => {
        if (response) {
          this.services = response;
          console.log(response);
        }
      },
      error => {
        console.log(error);
      })
  }

  getCategoryServices(category) {
    console.log(category);
    this.homeService.searchParam.s = 50;
    this.homeService.searchParam.term = category;
    this.homeService.getServices().subscribe(
      response => {
        if (response && response.data) {
          this.services = response.data;
        }
      });
  }

}
