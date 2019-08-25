import { Component, OnInit,OnDestroy  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/events.service';
declare var UIkit;

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit,OnDestroy {

  showReset: boolean;
  eventsList: any[];
  countData: {"all":0,"outdoor":0,"indoor":0};
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
    startDatetime: number
  };
  paramsSubs: any;

  constructor(private route:ActivatedRoute,private eventService: EventService) { }

  ngOnInit() {
    this.countData = {"all":0,"outdoor":0,"indoor":0};
    this.searchParams = {
      p: 0,
      s: 18,
      searchTxt: "",
      eventType: 0,
      startDatetime: (new Date()).getTime()
    }
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    }); 
  }
  ngOnDestroy(){
    this.paramsSubs.unsubscribe();
  }
  
  initiate(){
    this.searchParams = {
      p: 0,
      s: 18,
      searchTxt: "",
      eventType: 0,
      startDatetime: (new Date()).getTime()
    }
    if(this.route.snapshot.params['type'] !== undefined){
      this.searchParams.eventType = this.route.snapshot.params['type'];
    }
    this.onSearch();
    setTimeout( ()=> {UIkit.tab("#eventtab").show(this.searchParams.eventType);},500);
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
    this.eventService.searchEventsCount({"searchTxt": this.searchParams.searchTxt,"eventType":0,"startDatetime":this.searchParams.startDatetime}).subscribe( (response:any) =>{
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
  onSearchChange(event: any) {
    const value = event.target.value;
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchParams.searchTxt = value;
    if(event.key === "Enter"){
      this.onSearch();    
    }
  }

  resetSearch(event: any) {
    if(event.clientX!=0){ // this is to make sure it is an event not raise by hitting enter key
      this.searchParams.searchTxt = "";
      this.showReset = false;
      this.onSearch()
    }
  }

  onSearch() {
    this.showEvents();
    this.showEventsCount();
  }

}