import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO, Service } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';
import { StorageHelperService } from 'src/app/core/services/storage-helper.service';
declare var UIkit: any;

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit, OnDestroy {
  
  searchTxt:string;
  tempSearchTxt: string;
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
      this.setSearchTxt(this.homeService.homeSearchtxt);
      this.showReset = true;
      this.showResult = true;
    }
    this.route.snapshot.paramMap.get('tab')
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
    if(this.route.snapshot.paramMap.get('tab')=='events'){
      this.show = "events"
    }
    else{
      this.show = "discss";
    }
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
    if (event.key == "Enter" || value=="") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt(""); 
      this.discussionCategory="";
      this.pastEvents=""; 
      this.homeService.eventIsPastEvents=0;
      this.homeService.discussCategory=""
      this.showReset = false;
     this.onSearch();
    }
  }

  onSearch() {
    this.setSearchTxt(this.tempSearchTxt);
    this.router.navigate(['/community'], { queryParams: { searchTxt: this.searchTxt, 
                                                category: this.discussionCategory,
                                                past: this.pastEvents,
                                                show: this.show } });
  }
  
  setSearchTxt(value: string) {
    this.searchTxt = value;
    this.tempSearchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
  
  showDiscussionCount(value){
    this.searchData.totalDiscussions = value;
    this.getMaxCount();
  }

  showEventCount(value){
    this.searchData.totalEvents = value;
    this.getMaxCount();
  }

  getMaxCount() {
    const getelem = document.getElementById("search-tab");
    if(this.show == 'discss'){
      UIkit.tab(getelem).show(0);
    }
    else if(this.show == 'events'){
      UIkit.tab(getelem).show(1);
    }
    else{
      const maxTotal = Math.max(
        this.searchData.totalEvents,
        this.searchData.totalDiscussions);
      switch (maxTotal) {
        case this.searchData.totalEvents:
          UIkit.tab(getelem).show(1);
          break;
        case this.searchData.totalDiscussions:
  
          UIkit.tab(getelem).show(0);
          break;
        default:
          UIkit.tab(getelem).show(0);
          break;
      }
    }
    
  }
}