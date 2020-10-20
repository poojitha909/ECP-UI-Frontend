import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../../features/community/services/menu.service'
import { DiscussionService } from '../../features/community/services/discussion.service'
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from 'src/app/features/home/home.service';
declare var UIkit: any;

@Component({
  selector: 'app-discussion-results',
  templateUrl: './discussion-results.component.html',
  styleUrls: ['./discussion-results.component.scss']
})
export class DiscussionResultsComponent implements OnInit, OnChanges {

  @Input() searchTxt: string;
  @Input() showPagination: boolean;
  @Input() showSharing: boolean;
  @Output() showCount: EventEmitter<number> = new EventEmitter();
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
  isLoading: boolean;
  totalPages: number;

  showingDiscussion :string;


  constructor(private route: ActivatedRoute, private router: Router,
    private discussionService: DiscussionService, private menuService: MenuService,
    public sanitizer: DomSanitizer, private homeService: HomeService
  ) {
  }

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(params => {
      this.initiate();
    });
    console.log(this.searchParams.tags,'tags asdfghjk')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.searchTxt.firstChange) {
      this.initiate();
    }
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }
  

  initiate() {
    this.currentUrl = encodeURI(window.location.href);
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
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
    if (this.searchTxt) {
      this.searchParams.searchTxt = this.searchTxt;
    }
    if (this.route.snapshot.queryParams['searchTxt'] !== undefined) {
      this.searchParams.searchTxt = this.route.snapshot.queryParams['searchTxt'];
    }
    if (this.route.snapshot.queryParams['category']) {
      this.selCategory = this.route.snapshot.queryParams['category'];
    }
    else if (this.homeService.discussCategory) {
      this.selCategory = this.homeService.discussCategory;
    }
    if (this.route.snapshot.queryParams['page'] !== undefined) {
      this.searchParams.p = +this.route.snapshot.queryParams['page'];
    }
    if (this.route.snapshot.queryParams['show'] != 'discss') {
      this.searchParams.p = 0;
    }
    this.getAllCategories();
  }

  changePage(page) {
    this.searchParams.p = page;
    if (this.showPagination) {
      this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt, page: this.searchParams.p, show: "discss" } });
    }
    else {
      this.search();
    }
  }

  onTabChange(value) {
    this.selCategory = value;
    this.searchParams.p = 0;
    this.homeService.discussCategory = this.selCategory;
    if (this.showPagination) {
      this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt, show: "discss" } });
    }
    else {
      this.search();
    }
  }

  getAllCategories() {
    this.isLoading = true;
    this.menuService.getMenus("564071623e60f5b66f62df27", "").subscribe((response: any) => {
      const data = response;
      let tags = [];
      this.categoryList = {};
      this.isLoading = false;
      if (data.length > 0) {
        this.isLoading = true;
        for (let i in data) {
          this.categoryList[data[i].id] = { id: data[i].id, label: data[i].displayMenuName, tagIds: [], totalCount: 0, discussionLatest: null };
          if (data[i].tags) {
            for (let j in data[i].tags) {
              this.categoryList[data[i].id].tagIds[j] = data[i].tags[j].id;
            }
            tags[i] = data[i].id + "_" + this.categoryList[data[i].id].tagIds.join("_"); // this is just to pass extras key in tags which is menu item id
          }
        }
        this.discussionService.summary(tags.join(","), this.searchParams.searchTxt).subscribe((response: any) => {
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
    this.searchParams.p = 0;
    this.selCategory = "";
    this.homeService.discussCategory = this.selCategory;
    if (this.showPagination) {
      this.router.navigate(['/community'], { queryParams: { category: "", searchTxt: this.searchParams.searchTxt, show: "discss" } });
    }
    else {
      this.search();
    }
  }

  showDiscussions() {
    this.isLoading = true;
    this.discussionService.searchDiscussions(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      this.discussionsList = [];
      if (data.content) {
        this.discussionsList = data.content;
      }
      this.totalRecords = data.total;
      this.totalPages = Math.ceil(this.totalRecords / this.searchParams.s);
      this.showCount.emit(this.totalRecords);
      this.isLoading = false;
    });
  }

  applyFilter() {
    UIkit.modal('#article-mobile-category-modal').hide();
    if (this.selCategory) {
      this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt} });
    } else {
      this.clearSelection();
    }
  }


  // onTabChange(value) {
  //   this.selCategory = value;
  //   this.searchParams.p = 0;
  //   this.homeService.discussCategory = this.selCategory;
  //   if (this.showPagination) {
  //     this.router.navigate(['/community'], { queryParams: { category: this.selCategory, searchTxt: this.searchParams.searchTxt, show: "discss" } });
  //   }
  //   else {
  //     this.search();
  //   }
  // }
}
