import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/events.service';
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';

declare var UIkit;

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public sanitizer: DomSanitizer,
    private homeService: HomeService,
    private seoService: SeoService) {

    // Generate meta tag 
    const config: SEO = {
      title: `All Events - An Elder Spring Initiative by Tata Trusts`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    this.seoService.generateTags(config);

  }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.countData = { "all": 0, "outdoor": 0, "indoor": 0 };
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {

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
    if (this.route.snapshot.queryParams['past'] !== undefined) {
      this.searchParams.pastEvents = this.route.snapshot.queryParams['past'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = this.route.snapshot.queryParams['page'];
    }
    this.showEvents();
    this.showEventsCount();
  }

  changePage(page: number) {
    this.searchParams.p = page;
    this.onSearch();
  }

  showEvents() {
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.eventsList = [];
      if (data.content) {
        this.eventsList = data.content;
        this.totalRecords = data.total;
      }
    },
      error => {

      },
      () => {
        setTimeout(() => {
          document.getElementById("allEventsHeader").focus();
        }, 500);
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
    this.setSearchTxt(value);
    if (event.key === "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.router.navigate(['/community/events'], { queryParams: { past: this.searchParams.pastEvents, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p } });
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
    this.searchParams.p = 0;
  }

}