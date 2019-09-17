import { Component, OnInit } from '@angular/core';
import { EpcServiceService } from '../../epc-service.service';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.scss']
})
export class PopularSearchComponent implements OnInit {

  constructor(
    private ecpService: EpcServiceService,
    private homeService:HomeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getCategoryServices(category) {
    this.homeService.selectedCategory = category;
    this.router.navigateByUrl('/services/all');
  }

}
