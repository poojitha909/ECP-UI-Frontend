import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO, PageParam, Service } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StorageHelperService } from 'src/app/core/services/storage-helper.service';


@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit, OnDestroy {
  
  searchTxt:string;
  discussionCategory:string;
  pastEvents:string;
  showPagination: boolean;
  showSharing: boolean;
  currentUrl: string;

  showReset: boolean;
  paramsSubs: any;
  show:string;
  noRecords: boolean;
  showResult: boolean;
  isLoading: boolean;
  searchTextChanged = new Subject<string>();
 

  searchPageParam: PageParam = {
    p: 0,
    s: 6,
    term: ''
  };
  hide:any;
  searchData: any = {
    discussions: [],
    events: [],
    maxResult: 0,
    totalDiscussions: 0,
    totalEvents: 0,
  };

  autocompleteFields: Service[] = [];
  user: any;
  constructor(private router: Router, private homeService: HomeService,private store: StorageHelperService,
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
    this.user = this.store.retrieve("ECP-USER");
    
    this.searchTxt = "";
    this.showPagination = true;
    this.showSharing = true;
    this.currentUrl = window.location.href;

   
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchTxt ? true : false;
    }
    if (this.route.snapshot.queryParams['category'] !== undefined) {
      this.discussionCategory = this.route.snapshot.queryParams['category'];
    }

    if (this.route.snapshot.queryParams['past'] !== undefined) {
      this.pastEvents = this.route.snapshot.queryParams['past'];
      this.show = "events";
    }
    else{
      this.show = "discss";
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.setSearchTxt(this.route.snapshot.queryParams['searchTxt']);
      this.showReset = this.searchTxt? true : false;
    }
    if (!this.searchTxt && this.homeService.homeSearchtxt) {
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
    }
    if(this.route.snapshot.queryParams['show']){
      this.show = this.route.snapshot.queryParams['show'];
    }
  }

  homeSearchPages() {
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
      this.searchData.discussions = response.discussPage.content;
      this.searchData.totalDiscussions = response.discussPage.total;
      this.searchData.events = response.eventPage.content;
      this.searchData.totalEvents = response.eventPage.total;
      this.searchData.maxResult = Math.max(
        this.searchData.totalDiscussions,
        this.searchData.totalEvents,
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

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true;
    } else {
      this.showReset = false;
    }
    this.setSearchTxt(value);
    if (event.key == "Enter") {
      this.searchPageParam.term=this.searchTxt;
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.showReset = false;
     this.onSearch();
    }
  }

  onSearch() {
    this.searchPageParam.term=this.searchTxt;
    this.homeSearchPages();
    this.router.navigate(['/community'], { queryParams: { searchTxt: this.searchTxt, 
                                                category: this.discussionCategory,
                                                past: this.pastEvents,
                                                show: this.show } });
  }
  
  setSearchTxt(value: string) {
    this.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}