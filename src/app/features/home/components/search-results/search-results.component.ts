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
  allCount = {
    servicesTotal: null,
    productTotal: null,
    expertTotal: null,
    eventTotal: null,
    discussionTotal: null
  }

  maxTotal: number;
  hasMaxCal: boolean;
  constructor() {
  }

  ngOnInit() {
  }

  getTotalServices(tot: number) {
    this.allCount.servicesTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }

  getTotalProducts(tot: number) {
    this.allCount.productTotal = tot;

    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalExperts(tot: number) {
    this.allCount.expertTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalEvents(tot: number) {
    this.allCount.eventTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalDiscussions(tot: number) {
    this.allCount.discussionTotal = tot;
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }

  getMaxCount() {

    this.maxTotal = Math.max(
      this.allCount.servicesTotal,
      this.allCount.productTotal,
      this.allCount.expertTotal,
      this.allCount.eventTotal,
      this.allCount.discussionTotal);

    const getelem = document.getElementById("search-tab");
    switch (this.maxTotal) {
      case this.allCount.eventTotal:
        UIkit.tab(getelem).show(1);
        break;
      case this.allCount.expertTotal:

        UIkit.tab(getelem).show(2);
        break;
      case this.allCount.productTotal:

        UIkit.tab(getelem).show(3);
        break;
      case this.allCount.servicesTotal:

        UIkit.tab(getelem).show(4);
        break;
      default:
        UIkit.tab(getelem).show(0);
        break;
    }

    const checkMax: any[] = Object.values(this.allCount).filter(value => value === null);

    if (checkMax.length == 0) {
      this.hasMaxCal = true;
    }
  }
}
