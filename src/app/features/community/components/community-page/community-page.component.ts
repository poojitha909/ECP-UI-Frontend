import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO, Service, PageParam } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import 'rxjs/add/observable/timer';
// import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit, OnDestroy {
  
  showReset: boolean;
  paramsSubs: any;
  show:string;
  hideOnSearch:boolean = true;
  showOnSearch:boolean = false;
  selectedValue: string;
  noRecords: boolean;
  showResult: boolean;
  isLoading: boolean;
  searchTextChanged = new Subject<string>();
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    pastEvents: number,
    category: string
  };
  searchPageParam: PageParam = {
    p: 0,
    s: 6,
    term: ''
  };
  searchData: any = {
    discussions: [],
    events: [],
    maxResult: 0,
    totalDiscussions: 0,
    totalEvents: 0,
  };

  autocompleteFields: Service[] = [];
  constructor(private router: Router, private homeService: HomeService,
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

    if (this.homeService.homeSearchtxt) {
      this.searchPageParam.term = this.homeService.homeSearchtxt;
      this.communitySearchPages();
      this.showReset = true;
      this.showResult = true;
    }

    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearchChange(this.searchPageParam.term);
    })
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
    
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchPageParam.term ? true : false;
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
      this.showReset = this.searchPageParam.term ? true : false;
    }
    if (!this.searchParams.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    if(this.route.snapshot.queryParams['show']){
      this.show = this.route.snapshot.queryParams['show'];
    }
  }
  
  communitySearchPages(){
    this.isLoading = true;
    this.homeService.searchParam = this.searchPageParam;
    // Home search pages API
    this.homeService.getHomeSearchPages().subscribe(response => {
      this.isLoading = false;
      if (response && response.servicePage) {
        const servicePage = JSON.parse(response.servicePage);
        this.searchData.services = servicePage.content.slice(0, 6);
        this.searchData.totalServices = servicePage.total
      }
      this.searchData.products = response.productPage.content;
      this.searchData.totalProducts = response.productPage.total;
      this.searchData.discussions = response.discussPage.content;
      this.searchData.totalDiscussions = response.discussPage.total;
      this.searchData.events = response.eventPage.content;
      this.searchData.experts = response.expertPage.content;
      this.searchData.totalEvents = response.eventPage.total;
      this.searchData.totalExperts = response.expertPage.total;
      this.searchData.maxResult = Math.max(
        this.searchData.totalServices,
        this.searchData.totalProducts,
        this.searchData.totalDiscussions,
        this.searchData.totalExperts,
        this.searchData.totalEvents
       );
      if (this.searchData.maxResult == 0) {
        this.noRecords = true;
      } else {
        this.noRecords = false;
      }
      this.showResult = true;
    },
      error => {
        this.isLoading = false;
        console.log(error);
      });
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
      this.hideOnSearch=true;
      this.showOnSearch=false;
      // this.onSearch()
    }
  }

  onSearch(field?: string) {
    this.hideOnSearch=false;
    this.showOnSearch=true;
    this.homeService.homeSearchtxt = field;
    this.communitySearchPages();
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