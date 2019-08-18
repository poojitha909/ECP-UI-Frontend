import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events.service';
import {DiscussionService} from '../../services/discussions.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  showReset: boolean;
  eventsList: any[];
  discussionsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    startDatetime: number
  };
  searchParamsDiscussions: {
    p: number,
    s: number,
    searchTxt: string,
    isFeatured: boolean
  }

  constructor(private eventService: EventService,private discussionService: DiscussionService) {
  }


  ngOnInit(): void {
    this.searchParams = {
      p: 0,
      s: 3,
      searchTxt: "",
      eventType: 0,
      startDatetime: (new Date()).getTime()
    }
    this.searchParamsDiscussions= {
      p: 0,
      s: 3,
      searchTxt: "",
      isFeatured: true
    }
    this.showEvents();
    this.showDiscussions();
  }

  showEvents(){
    this.eventService.searchEvents(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      this.eventsList = [];
      if(data.content){
        this.eventsList = data.content;
      }
    });
  }
  showDiscussions(){
    this.discussionService.searchDiscussions(this.searchParamsDiscussions).subscribe( (response:any) =>{
      const data = response.data;
      this.discussionsList = [];
      if(data.content){
        this.discussionsList = data.content;
      }
    });
  }

  showTodayText(timestamp: number){
    const today = new Date();
    let checkDay = new Date(timestamp);
    if(checkDay.getDate() == today.getDate() && 
        checkDay.getMonth() == today.getMonth() && 
        checkDay.getFullYear() == today.getFullYear()){
      return "(Today)";
    }
    checkDay = new Date(timestamp - 86400000);
    if(checkDay.getDate() == today.getDate() && 
        checkDay.getMonth() == today.getMonth() && 
        checkDay.getFullYear() == today.getFullYear()){
      return "(Tomorrow)";
    }
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    this.searchParamsDiscussions.searchTxt = value;
  }

  resetSearch() {
    this.searchParams.searchTxt = "";
    this.searchParamsDiscussions.searchTxt = "";
    this.showReset = false;
    this.showEvents();
    this.showDiscussions();
  }

  onSearch() {
    this.showEvents();
    this.showDiscussions();
  }
}