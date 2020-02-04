import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/features/community/services/events.service';

@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  styleUrls: ['./featured-events.component.scss']
})
export class FeaturedEventsComponent implements OnInit {

  searchParams = {
    p: 0,
    s: 6,
    searchTxt: "",
    eventType: 0,
    pastEvents: -1
  };
  events: any;

  
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.initiate();
  }

  initiate(){
    this.showEvents();
  }

  showEvents() {
    let searchParams = JSON.parse(JSON.stringify(this.searchParams));
    searchParams.searchTxt = "";
    this.eventService.searchEvents(searchParams).subscribe((response: any) => {
      const data = response.data;
      this.events = [];
      if (data.content) {
        this.events = data.content;
      }
    });
  }

}
