import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() searchTerm: string;
  @Output() showCount: EventEmitter<any> = new EventEmitter();

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

  ngOnChanges(change: SimpleChanges) {
    if (!change.searchTerm.firstChange) {
      this.allCount = {
        servicesTotal: null,
        productTotal: null,
        expertTotal: null,
        eventTotal: null,
        discussionTotal: null
      }
      this.hasMaxCal = false;
    }
  }

  getTotalServices(tot: number) {
    this.allCount.servicesTotal = tot;
    this.showCount.emit(this.allCount);
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }

  getTotalProducts(tot: number) {
    this.allCount.productTotal = tot;
    this.showCount.emit(this.allCount);
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalExperts(tot: number) {
    this.allCount.expertTotal = tot;
    this.showCount.emit(this.allCount);
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalEvents(tot: number) {
    this.allCount.eventTotal = tot;
    this.showCount.emit(this.allCount);
    if (!this.hasMaxCal) {
      this.getMaxCount();
    }
  }
  getTotalDiscussions(tot: number) {
    this.allCount.discussionTotal = tot;
    this.showCount.emit(this.allCount);
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
