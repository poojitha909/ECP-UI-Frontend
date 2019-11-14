import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/events.service';
import { Breadcrumb } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

declare var UIkit;

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit, OnDestroy {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Community',
      link: '/community'
    }
  ];
  showReset: boolean;
  eventsList: any[];
  countData: { "all": 0, "outdoor": 0, "indoor": 0 };
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    pastEvents: number
  };
  paramsSubs: any;
  totalRecords: number;
  currentUrl: string;
  whatsappUrl;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService
    , public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.countData = { "all": 0, "outdoor": 0, "indoor": 0 };
    this.searchParams = {
      p: 0,
      s: 10,
      searchTxt: "",
      eventType: 0,
      pastEvents: 0
    }
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }
  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 4,
      searchTxt: "",
      eventType: 0,
      pastEvents: 0
    }

    this.totalRecords = 0;
    if(this.route.snapshot.queryParams['past'] !== undefined){
      this.searchParams.pastEvents = this.route.snapshot.queryParams['past'];
    }
    if(this.route.snapshot.queryParams['searchTxt'] !== undefined){
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }
    this.onSearch();
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch()
  }

  showEvents() {
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.eventsList = [];
      if (data.content) {
        this.eventsList = data.content;
        this.totalRecords = data.total;
      }
    });
  }

  showEventsCount() {
    this.eventService.searchEventsCount({ "searchTxt": this.searchParams.searchTxt, "eventType": 0 }).subscribe((response: any) => {
      this.countData = response.data;
    });
  }

  showTodayText(timestamp: number) {
    const today = new Date();
    let checkDay = new Date(timestamp);
    if (checkDay.getDate() == today.getDate() &&
      checkDay.getMonth() == today.getMonth() &&
      checkDay.getFullYear() == today.getFullYear()) {
      return "(Today)";
    }
    checkDay = new Date(timestamp - 86400000);
    if (checkDay.getDate() == today.getDate() &&
      checkDay.getMonth() == today.getMonth() &&
      checkDay.getFullYear() == today.getFullYear()) {
      return "(Tomorrow)";
    }
  }

  onTabChange(value) {
    this.router.navigate(['/community/events'], { queryParams: { past: value, searchTxt: this.searchParams.searchTxt } });
  }

  clearSelection() {
    this.searchParams.pastEvents = 0;
    this.router.navigateByUrl('/community/events');
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    if (event.key === "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.showEvents();
    this.showEventsCount();
  }

}