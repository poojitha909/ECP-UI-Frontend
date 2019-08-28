import { Component, OnInit } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service, JDserviceParam } from 'src/app/core/interfaces';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit {

  services: Service;

  constructor(public ecpService: EpcServiceService) { }

  ngOnInit() {
    this.getAllService();
  }

  getAllService() {
    this.ecpService.getJDAllServices().subscribe(
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
