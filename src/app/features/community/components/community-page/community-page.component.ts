import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { EventService } from '../../services/events.service';
import { DiscussionService } from '../../services/discussion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
// import 'rxjs/add/observable/timer';
// import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit, OnDestroy {

  showReset: boolean;
  showResult: boolean;
  eventsList: any[] = [];
  discussionsList: any[] = [];
  selDiscussCategory: string;
  selEventCategory: string;
  paramsSubs: any;
  totalRecordsEvents: number;
  totalRecordsDiscussions: number;
  show:string;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    pastEvents: number,
    category: string
  };
  
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

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.searchParams = {
      p: 0,
      s: 6,
      searchTxt: "",
      eventType: 0,
      pastEvents: -1,
      category: ""
    }
    this.totalRecordsEvents = 0;
    
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (this.route.snapshot.queryParams['category'] !== undefined) {
      this.searchParams.category = this.route.snapshot.queryParams['category'];
    }

    if (this.route.snapshot.queryParams['past'] !== undefined) {
      this.searchParams.pastEvents = this.route.snapshot.queryParams['past'];
      this.show = "events";
    }
    else{
      this.show = "discss";
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchParams.searchTxt ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    if(this.route.snapshot.queryParams['show']){
      this.show = this.route.snapshot.queryParams['show'];
    }
  }
  
  showAll(tab) {
    this.show=tab
  }

  @HostListener('window:scroll', ['$event'])
  hideBanner() {
    if (window.scrollY > 380) {
      document.getElementById('communityBanner').style.display = 'none';
    }
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
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
    this.router.navigate(['/community'], { queryParams: { searchTxt: this.searchParams.searchTxt, 
                                                category: this.searchParams.category,
                                                past: this.searchParams.pastEvents,
                                                show: this.show } });
  }

  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}