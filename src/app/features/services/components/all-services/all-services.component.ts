import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { EpcServiceService } from '../../epc-service.service';
import { Service, PageParam } from 'src/app/core/interfaces';
import { JdCategoryService } from 'src/app/core/services';
import { HomeService } from 'src/app/features/home/home.service';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit, AfterViewInit {
  services: Service[];
  pageServices: Service[];
  pageSize = 5;
  maxPages: number;
  isLoading: boolean;
  searchPageParam: PageParam = {
    p: 0,
    s: 5,
    term: ''
  };
  autocompleteFields: Service[] = [];

  constructor(public ecpService: EpcServiceService, public JDcategory: JdCategoryService, private homeService: HomeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.homeService.selectedCategory) {
      this.getCategoryServices(this.homeService.selectedCategory);
      this.homeService.selectedCategory = undefined;
    } else {
      this.getAllService();
    }
  }

  getAllService() {
    this.isLoading = true;
    this.ecpService.getAllServices().subscribe(
      response => {
        if (response) {
          this.services = response;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          this.isLoading = false;
          console.log(response);
        }
      },
      error => {
        console.log(error);
      })
  }

  getCategoryServices(category) {
    this.isLoading = true;
    console.log(category);
    this.homeService.searchParam.s = 50;
    this.homeService.searchParam.term = category;
    this.homeService.getServices().subscribe(
      response => {
        if (response && response.data) {
          this.services = response.data;
          this.maxPages = Math.round(this.services.length / this.pageSize);
          this.isLoading = false;
        }
      });
  }

  onChangePage(services: any[]) {
    // update current page of items
    this.pageServices = services;
    this.cdr.detectChanges();
  }

  onSearchChange(value) {
    if (value !== "") {
      this.homeService.searchParam = this.searchPageParam;
      this.homeService.getAutoCompleteServices().subscribe(
        response => {
          this.autocompleteFields = response;
        });
    } else {
      this.autocompleteFields = [];
    }
  }

  onSearch(field) {
    this.searchPageParam.term = field;
    if (this.searchPageParam.term) {
      this.getCategoryServices(this.searchPageParam.term);
      this.autocompleteFields = [];
      this.searchPageParam.term = "";
    }
  }

}
