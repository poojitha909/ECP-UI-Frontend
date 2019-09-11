import { Component, OnInit } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit {

  services: Service;

  constructor(public ecpService: EpcServiceService, public JDcategory: JdCategoryService) { }

  ngOnInit() {
    this.getAllService();
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

  getCategoryServices(category, catId) {
    this.ecpService.serviceParam.category = category;
    this.ecpService.serviceParam.catID = catId;
    this.getAllService();
  }

}
