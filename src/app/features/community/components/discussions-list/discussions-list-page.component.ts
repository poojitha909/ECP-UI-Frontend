import { Component, OnInit } from '@angular/core';
import {DiscussionService} from '../../services/discussions.service';

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
  searchParams: {
    p: number,
    s: number,
    searchTxt: string
  }

  constructor(private discussionService: DiscussionService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 17,
      searchTxt: "",
    }
    this.countData = 0;
    this.onSearch();
    this.selCategory = "";
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