import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussion.service';
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
  categoryList: any;
  dropDownList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string
    tags: string;
  };
  paramsSubs: any;

  constructor(private route:ActivatedRoute,private router: Router, private discussionService: DiscussionService, private menuService: MenuService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 17,
      searchTxt: "",
      tags: ""
    }
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }
  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }

  initiate(){
    this.countData = 0;
    this.discussionsList = [];
    this.categoryList = null;
    this.selCategory = "";
    if(this.route.snapshot.params['category']){
      this.selCategory = this.route.snapshot.params['category'];
    }
    this.onSearch();
  }
  
  getCategories(){
    this.menuService.getMenus("564071623e60f5b66f62df27",this.searchParams.searchTxt).subscribe( (response:any) =>{
      const data = response;
      let tags = [];
      this.categoryList = {};
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
        if(this.dropDownList === undefined){
          this.dropDownList = JSON.parse(JSON.stringify(this.categoryList));
        }
        if(this.selCategory==""){
          this.discussionService.summary(tags.join(",")).subscribe((response:any) =>{
            for(let i in data){
              this.categoryList[data[i].id].totalCount = response.data[data[i].id].totalCount;
              if(response.data[data[i].id].discussPage && response.data[data[i].id].discussPage.content && response.data[data[i].id].discussPage.content[0]){
                this.categoryList[data[i].id].discussionLatest = response.data[data[i].id].discussPage.content[0];
              }
            }
          });
        }
      }
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
    if(this.selCategory){
      this.searchParams.tags = this.dropDownList[this.selCategory].tagIds.join(",");
    }
    this.router.navigate(['/community/discussions', this.selCategory]);
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
    this.getCategories();
    if(this.selCategory){
      this.showDiscussions();
      this.showDiscussionsCount();
    }
  }

}