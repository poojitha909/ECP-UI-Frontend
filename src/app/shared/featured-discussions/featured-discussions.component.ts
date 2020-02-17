import { Component, OnInit } from '@angular/core';
import { DiscussionService } from 'src/app/features/community/services/discussion.service';
import { MenuService } from '../../features/community/services/menu.service';
import { AppConstants } from 'src/app/app.constants';
import { StorageHelperService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-discussions',
  templateUrl: './featured-discussions.component.html',
  styleUrls: ['./featured-discussions.component.scss']
})
export class FeaturedDiscussionsComponent implements OnInit {

  discussions: any;
  discussCategoryList: any;
  selDiscussCategory = "";
  searchParamsDiscussions = {
    p: 0,
    s: 6,
    searchTxt: "",
    tags: ""
  }
  constructor(
    private discussionService: DiscussionService,
    private menuService: MenuService,
    private storageHelper: StorageHelperService,
    private router: Router
  ) { }
  ngOnInit() {
    this.initiate();
  }

  initiate() {
    this.selDiscussCategory = "";
    const featuredDiscussSession = this.storageHelper.retrieveSession(AppConstants.FEATURED_DISCUSSION);
    if (featuredDiscussSession) {
      this.selDiscussCategory = featuredDiscussSession;
    }
    this.getAllDiscussCategories();
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
      this.showDiscussions();
    });
  }

  showDiscussions() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParamsDiscussions));
    searchParams.tags = "";
    searchParams.searchTxt = "";
    if (this.selDiscussCategory != "") {
      searchParams.tags = this.discussCategoryList[this.selDiscussCategory].tagIds.join(",");
    }
    this.discussionService.searchDiscussions(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.discussions = [];
      if (data.content) {
        this.discussions = data.content;
      }
    });
  }

  seeAllDiscussions() {
    this.storageHelper.storeSession(AppConstants.FEATURED_DISCUSSION, this.selDiscussCategory);
    this.router.navigate(["/community/discussions"], { queryParams: { category: this.selDiscussCategory } });
  }

}
