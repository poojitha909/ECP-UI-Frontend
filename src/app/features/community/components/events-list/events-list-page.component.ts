import { Component, OnInit } from '@angular/core';
import EventService from '../../services/events.service';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {

  showReset: boolean;
  eventsList: any[];
  countData: {"all":0,"outdoor":0,"indoor":0};
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
  }

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.searchParams = {
      p: 0,
      s: 18,
      searchTxt: "",
      eventType: 0,
    }
    this.onSearch();
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

  showEventsCount(){
    this.eventService.searchEventsCount({"searchTxt": this.searchParams.searchTxt,"eventType":0}).subscribe( (response:any) =>{
      this.countData = response.data;
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

  onTabChange(value) {
    this.searchParams.eventType = value;
    this.showEvents();
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
    this.showEvents();
    this.showEventsCount();
  }

}