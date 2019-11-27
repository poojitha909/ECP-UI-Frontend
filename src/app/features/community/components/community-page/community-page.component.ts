import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/events.service';
import { DiscussionService } from '../../services/discussion.service';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { StorageHelperService } from 'src/app/core/services';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  showReset: boolean;
  eventsList: any[] = [];
  discussionsList: any[] = [];
  discussCategoryList: any;
  selDiscussCategory: string;
  discussionsList2: any;
  selEventCategory: string;
  eventsList2: any;
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
    private menuService: MenuService, private router: Router, private storageHelper: StorageHelperService,
    private seoService: SeoService
  ) {

    // Generate meta tag 
    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Community`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    this.seoService.generateTags(config);
  }


  ngOnInit(): void {
    this.searchParams = {
      p: 0,
      s: 10,
      searchTxt: "",
      eventType: 0,
      pastEvents: -1
    }
    this.searchParamsDiscussions = {
      p: 0,
      s: 10,
      searchTxt: "",
      tags: ""
    }
    this.selDiscussCategory = "";
    this.selEventCategory = "";
    this.getAllDiscussCategories();
    // this.showEvents();
    this.showEvents2();
    const homeSearchtxt = this.storageHelper.retrieveSession('homeSearchText');
    if (homeSearchtxt) {
      this.searchParams.searchTxt = homeSearchtxt;
      this.showReset = true;
    }
  }

  getAllDiscussCategories() {
    this.menuService.getMenus("564071623e60f5b66f62df27", "").subscribe((response: any) => {
      const data = response;
      let tags = [];
      this.discussCategoryList = {};
      if (data.length > 0) {
        for (let i in data) {
          this.discussCategoryList[data[i].id] = { id: data[i].id, label: data[i].displayMenuName, tagIds: [] };
          if (data[i].tags) {
            for (let j in data[i].tags) {
              this.discussCategoryList[data[i].id].tagIds[j] = data[i].tags[j].id;
            }
            tags[i] = data[i].id + "_" + this.discussCategoryList[data[i].id].tagIds.join("_"); // this si just to pass extrs key in tags which is menu item id
          }
        }
      }
      this.showDiscussions2();
    });
  }

  showEvents() {
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.eventsList = [];
      if (data.content) {
        this.eventsList = data.content;
      }
    });
  }
  showDiscussions() {
    this.discussionService.searchDiscussions(this.searchParamsDiscussions).subscribe((response: any) => {
      const data = response.data;
      this.discussionsList = [];
      if (data.content) {
        this.discussionsList = data.content;
      }
    });
  }

  showAllDiscussions() {
    this.router.navigate(['/community/discussions'], { queryParams: { category: this.selDiscussCategory, searchTxt: this.searchParamsDiscussions.searchTxt } });
  }
  showAllEvents() {
    this.router.navigate(['/community/events'], { queryParams: { past: this.searchParams.pastEvents, searchTxt: this.searchParams.searchTxt } });
  }

  showDiscussions2() {
    this.searchParamsDiscussions.tags = "";
    if (this.selDiscussCategory != "") {
      this.searchParamsDiscussions.tags = this.discussCategoryList[this.selDiscussCategory].tagIds.join(",");
    }
    this.discussionService.searchDiscussions(this.searchParamsDiscussions).subscribe((response: any) => {
      const data = response.data;
      this.discussionsList2 = [];
      if (data.content) {
        this.discussionsList2 = data.content;
      }
    });
  }
  showEvents2() {
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.eventsList2 = [];
      if (data.content) {
        this.eventsList2 = data.content;
      }
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

  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    this.searchParamsDiscussions.searchTxt = value;
    if (event.key == "Enter") {
      this.onSearch();
    }
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.searchParamsDiscussions.searchTxt = "";
      this.showReset = false;
      // this.onSearch()
    }
  }

  onSearch() {
    this.showEvents();
    this.showDiscussions();
    this.storageHelper.clearSession('homeSearchText');
  }

  onTabChange(tab: number) {

  }
}