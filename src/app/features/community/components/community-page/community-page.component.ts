import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { EventService } from '../../services/events.service';
import { DiscussionService } from '../../services/discussion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit, OnDestroy, AfterViewInit {

  showReset: boolean;
  showResult: boolean;
  eventsList: any[] = [];
  discussionsList: any[] = [];
  selDiscussCategory: string;
  selEventCategory: string;
  paramsSubs: any;
  totalRecordsEvents: number;
  totalRecordsDiscussions: number;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    pastEvents: number
  };
  searchParamsDiscussions: {
    p: number,
    s: number,
    tags: string,
    searchTxt: string
  }

  constructor(private eventService: EventService, private discussionService: DiscussionService,
    private router: Router, private homeService: HomeService,
    private seoService: SeoService, private route: ActivatedRoute) {

    // Generate meta tag 
    const config: SEO = {
      title: `Community Let's Talk - An Elder Spring Initiative by Tata Trusts`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    this.seoService.generateTags(config);


  }


  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    document.getElementById("communitySearch").focus();
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 6,
      searchTxt: "",
      eventType: 0,
      pastEvents: -1
    }
    this.searchParamsDiscussions = {
      p: 0,
      s: 6,
      searchTxt: "",
      tags: ""
    }
    this.totalRecordsEvents = 0;
    this.totalRecordsDiscussions = 0;
    this.selDiscussCategory = "";
    this.selEventCategory = "";

    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }

    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }

    this.showEvents();
    this.showDiscussions();
  }

  showEvents() {
    this.showResult = false;
    if (this.searchParams.searchTxt != "") {
      this.showResult = true;
      this.totalRecordsEvents = 0;
      this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
        const data = response.data;
        this.eventsList = [];
        if (data.content) {
          this.eventsList = data.content;
          this.totalRecordsEvents = data.total;
        }
      });
    }
  }

  showDiscussions() {
    this.showResult = false;
    if (this.searchParamsDiscussions.searchTxt != "") {
      this.showResult = true;
      this.totalRecordsDiscussions = 0;
      this.discussionService.searchDiscussions(this.searchParamsDiscussions).subscribe((response: any) => {
        const data = response.data;
        this.discussionsList = [];
        if (data.content) {
          this.discussionsList = data.content;
          this.totalRecordsDiscussions = data.total;
        }
      });
    }
  }

  showAllDiscussions() {
    this.router.navigate(['/community/discussions'], { queryParams: { category: this.selDiscussCategory, searchTxt: this.searchParamsDiscussions.searchTxt } });
  }
  showAllEvents() {
    this.router.navigate(['/community/events'], { queryParams: { past: this.searchParams.pastEvents, searchTxt: this.searchParams.searchTxt } });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
      this.showResult = false;
    }
    this.setSearchTxt(value);

    if (event.key == "Enter") {
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
    this.showEvents();
    this.showDiscussions();
    document.getElementById("communitySearch").focus();
  }

  onTabChange(tab: number) {

  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.searchParamsDiscussions.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}