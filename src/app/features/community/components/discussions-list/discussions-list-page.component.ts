import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { MenuService } from '../../services/menu.service';
import { SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { HomeService } from 'src/app/features/home/home.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-discussions-list-page',
  templateUrl: './discussions-list-page.component.html',
  styleUrls: ['./discussions-list-page.component.scss']
})
export class DiscussionsListPageComponent implements OnInit, OnDestroy {

  @Input() hide: false;

  discussionsList: any[];
  selCategory: string;
  categoryList: any;
  dropDownList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string
    tags: string;
  };
  paramsSubs: any;
  totalRecords: number;
  currentUrl: string;
  whatsappUrl;
  initial: number = 0
  final: number = 6;

  constructor(private route: ActivatedRoute, private router: Router,
    private discussionService: DiscussionService, private menuService: MenuService,
    public sanitizer: DomSanitizer, private homeService: HomeService,
    private seoService: SeoService
  ) {

    // Generate meta tag 
    const config: SEO = {
      title: `All Discussions - An Elder Spring Initiative by Tata Trusts`,
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
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.searchParams = {
      p: 0,
      s: 6,
      searchTxt: "",
      tags: ""
    }
    this.totalRecords = 0;
    this.discussionsList = [];
    this.categoryList = null;
    this.selCategory = "";
    if (this.route.snapshot.queryParams['category']) {
      this.selCategory = this.route.snapshot.queryParams['category'];
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
    this.getAllCategories();
  }

  changePage(page) {
    this.searchParams.p = page;

    this.submitSearch();
  }

  submitSearch() {
    this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p, show: "discss" } });
  }

  onTabChange(value) {
    this.selCategory = value;
    this.searchParams.p = 0;
    this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt, show: "discss" } });
  }

  resetSearch(event: any) {
    if (event.clientX != 0) { // this is to make sure it is an event not raise by hitting enter key
      this.setSearchTxt("");
      this.search();
    }
  }

  getAllCategories() {
    this.menuService.getMenus("564071623e60f5b66f62df27", "").subscribe((response: any) => {
      const data = response;
      let tags = [];
      this.categoryList = {};
      if (data.length > 0) {
        for (let i in data) {
          this.categoryList[data[i].id] = { id: data[i].id, label: data[i].displayMenuName, tagIds: [], totalCount: 0, discussionLatest: null };
          if (data[i].tags) {
            for (let j in data[i].tags) {
              this.categoryList[data[i].id].tagIds[j] = data[i].tags[j].id;
            }
            tags[i] = data[i].id + "_" + this.categoryList[data[i].id].tagIds.join("_"); // this is just to pass extras key in tags which is menu item id
          }
        }
        this.discussionService.summary(tags.join(","),this.searchParams.searchTxt).subscribe((response: any) => {
          for (let i in data) {
            this.categoryList[data[i].id].totalCount = response.data[data[i].id].totalCount;
          }
          this.dropDownList = JSON.parse(JSON.stringify(this.categoryList));
          this.search();
        });
      }
    });
  }


  search() {
    this.searchParams.tags = "";
    if (this.selCategory != "") {
      this.searchParams.tags = this.dropDownList[this.selCategory].tagIds.join(",");
    }
    this.showDiscussions();
  }

  clearSelection() {
    this.searchParams.tags = "";
    this.router.navigate(['/community'], { queryParams: { category: "", searchTxt: this.searchParams.searchTxt, show: "discss" } });
  }

  showDiscussions() {
    this.discussionService.searchDiscussions(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.discussionsList = [];
      if (data.content) {
        this.discussionsList = data.content;
      }
      this.initial = this.searchParams.p * this.searchParams.s + 1;
      this.final = this.initial + this.discussionsList.length - 1
      this.totalRecords = data.total;

    });
  }
  setSearchTxt(value: string) {
    this.searchParams.searchTxt = value;
    this.homeService.homeSearchtxt = value;
  }
}