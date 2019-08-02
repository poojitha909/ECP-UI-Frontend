import { Component, OnInit } from '@angular/core';
import EventService from '../../services/events.service';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {

  showReset: boolean;
  eventType: string;
  eventsList: any;
  countData: any;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
  }

  constructor(private eventService: EventService) {
    this.searchParams = {
      p: 0,
      s: 18,
      searchTxt: "",
      eventType: 0,
    }
    this.eventType = "all";
    this.eventsList = {"all": [],"outdoor": [],"indoor": []};
    this.countData = {"all":0,"outdoor":0,"indoor":0};
  }

  ngOnInit() {
    this.onSearch();
  }

  showEvents(){
    this.eventService.searchEvents(this.searchParams).subscribe( (response:any) =>{
      const data = response.data;
      if(data.content){
        console.log(this.eventType);
        this.eventsList[this.eventType] = data.content;
        console.log(this.eventsList);
      }
    });
  }
  showEventsCount(){
    this.eventService.searchEventsCount({"searchTxt": this.searchParams.searchTxt}).subscribe( (response:any) =>{
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

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
  }

  onTabChange(value) {
    if(value == "all"){
      this.searchParams.eventType = 0;  
    }
    else if(value == "outdoor"){
      this.searchParams.eventType = 1;
    }
    else if(value == "indoor"){
      this.searchParams.eventType = 2;
    }
    this.eventType = value;
    this.showEvents();
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