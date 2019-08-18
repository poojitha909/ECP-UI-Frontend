import { Component, OnInit } from '@angular/core';
import {DiscussionService} from '../../services/discussions.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-discussions-list-page',
  templateUrl: './discussions-list-page.component.html',
  styleUrls: ['./discussions-list-page.component.scss']
})
export class DiscussionsListPageComponent implements OnInit {

  showReset: boolean;
  discussionsList: any[];
  countData: number;
  selCategory: string;
  categoryList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string
    tags: string;
  }

  constructor(private discussionService: DiscussionService, private menuService: MenuService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 17,
      searchTxt: "",
      tags: ""
    }
    this.countData = 0;
    this.onSearch();
    this.selCategory = "";
    this.menuService.getMenus("564071623e60f5b66f62df27").subscribe( (response:any) =>{
      const data = response;
      this.categoryList = [];
      let tags = [];
      if(data.length > 0){
        for(let i in data){
          this.categoryList[ data[i].id ] = {id: data[i].id, label: data[i].displayMenuName, tagIds:[], totalCount:0, discussionLatest:null};
          if(data[i].tags){
            for(let j in data[i].tags){
              this.categoryList[ data[i].id ].tagIds[j] = data[i].tags[j].id; 
            }
            tags[i] = data[i].id + "_" + this.categoryList[ data[i].id ].tagIds.join("_"); // this si just to pass extrs key in tags which is menu item id
          }
        }
      }

      this.discussionService.summary(tags.join(",")).subscribe((response:any) =>{
        if(data.length > 0){
          for(let i in data){
            this.categoryList[data[i].id].totalCount = response.data[data[i].id].totalCount;
            if(response.data[data[i].id].discussPage && response.data[data[i].id].discussPage.content && response.data[data[i].id].discussPage.content[0]){
              this.categoryList[data[i].id].discussionLatest = response.data[data[i].id].discussPage.content[0];
            }
          }
        }
      });
    });

  }

  showDiscussions(){
    this.discussionService.searchDiscussions(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.discussionsList = [];
      if(data.content){
        this.discussionsList = data.content;
      }
    });
  }

  showDiscussionsCount(){
    this.discussionService.searchDiscussionsCount({"searchTxt": this.searchParams.searchTxt,"contentTypes": "total"}).subscribe( (response:any) =>{
      this.countData = response.data.z;
    });
  }

  onTabChange(value) {
    this.selCategory = value;
    this.searchParams.tags = this.categoryList[this.selCategory].tagIds.join(",");
    this.showDiscussions();
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
  }

  resetSearch() {
    this.searchParams.searchTxt = "";
    this.showReset = false;
    this.onSearch();
  }

  onSearch() {
    this.showDiscussions();
    this.showDiscussionsCount();
  }

}