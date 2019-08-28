import { Component, OnInit } from '@angular/core';
import { EpcServiceService } from '../../epc-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.scss']
})
export class PopularSearchComponent implements OnInit {

  constructor(
    private ecpService: EpcServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getCategoryServices(category, catId) {
    this.ecpService.serviceParam.category = category;
    this.ecpService.serviceParam.catID = catId;
    this.router.navigateByUrl('/services/all');
  }

}
