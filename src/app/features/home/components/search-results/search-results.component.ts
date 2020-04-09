import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() searchData: any;
  @Input() searchTerm: string;

  servicesTotal: number = 0;
  productTotal: number = 0;
  expertTotal: number = 0;
  eventTotal: number = 0;
  discussionTotal: number = 0;
  maxTotal: number;
  hasMaxCal: boolean;
  constructor() {
    console.log(this.searchData, 'search component')
  }

  ngOnInit() {
  }

  getTotalServices(tot: number) {
    this.servicesTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }

  getTotalProducts(tot: number) {
    this.productTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalExperts(tot: number) {
    this.expertTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalEvents(tot: number) {
    this.eventTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalDiscussions(tot: number) {
    this.discussionTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }

  getMaxCount() {
    this.maxTotal = Math.max(
      this.servicesTotal,
      this.productTotal,
      this.expertTotal,
      this.eventTotal,
      this.discussionTotal);

    const getelem = document.getElementById("search-tab");
    switch (this.maxTotal) {
      case this.eventTotal:
        UIkit.tab(getelem).show(1);
        break;
      case this.expertTotal:

        UIkit.tab(getelem).show(2);
        break;
      case this.productTotal:

        UIkit.tab(getelem).show(3);
        break;
      case this.servicesTotal:

        UIkit.tab(getelem).show(4);
        break;
      default:
        UIkit.tab(getelem).show(0);
        break;
    }
    this.hasMaxCal = true;
  }
}
