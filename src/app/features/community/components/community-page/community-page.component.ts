import { Component, OnInit } from '@angular/core';
import EventService from '../../services/events.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  showReset: boolean;
  eventsList: any[];
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
  }

  constructor(private eventService: EventService) {
  }


  ngOnInit(): void {
    this.searchParams = {
      p: 0,
      s: 3,
      searchTxt: "",
      eventType: 0,
    }
    this.showEvents();
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
  }

  resetSearch() {
    this.searchParams.searchTxt = "";
    this.showReset = false;
    this.showEvents();
  }

  onSearch() {
    this.showEvents();
  }
}