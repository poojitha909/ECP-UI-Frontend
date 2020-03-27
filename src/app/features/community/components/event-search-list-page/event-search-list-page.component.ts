import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/events.service';
import { SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-event-search-list-page',
  templateUrl: './event-search-list-page.component.html',
  styleUrls: ['./event-search-list-page.component.scss']
})
export class EventSearchListPageComponent implements OnInit, OnDestroy {

  eventsList: any[];
  countData: { "all": 0, "outdoor": 0, "indoor": 0 };
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    pastEvents: number,
    dir:number
  };
  paramsSubs: any;
  totalRecords: number;
  currentUrl: string;
  whatsappUrl;
  initial: number;
  final: number;

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
    this.router.navigate([], { queryParams: { past: -1, searchTxt: this.searchParams.searchTxt } });
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
      pastEvents: 0,
      dir:0
    }

    this.totalRecords = 0;
    if (this.route.snapshot.queryParams['past'] !== undefined) {
      this.searchParams.pastEvents = this.route.snapshot.queryParams['past'];
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
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
    if(this.searchParams.pastEvents==-1){
      this.searchParams.dir = 1;
    }
    else if(this.searchParams.pastEvents==1){
      this.searchParams.dir = 0;
    }
    else if(this.searchParams.pastEvents==0){
      this.searchParams.dir = 0;
    }
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.eventsList = [];
      if (data.content) {
        this.eventsList = data.content;
        this.totalRecords = data.total;
        this.initial = this.searchParams.p * this.searchParams.s + 1;
        this.final = this.initial + this.eventsList.length - 1

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
    this.router.navigate(['/community'], { queryParams: { past: value, searchTxt: this.searchParams.searchTxt, show: "events" } });
  }

  clearSelection() {
    this.searchParams.pastEvents = -1;
    this.router.navigate(['/community'], { queryParams: { past: this.searchParams.pastEvents, searchTxt: this.searchParams.searchTxt, show: "events" } });
  }

  onSearch() {
    this.router.navigate(['/community'], { queryParams: { past: this.searchParams.pastEvents, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p, show: "events" } });
  }

  setSearchTxt(value: string){
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
    this.searchParams.p = 0;
  }

}
