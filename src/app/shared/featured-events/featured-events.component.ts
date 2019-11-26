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
    s: 9,
    searchTxt: "",
    eventType: 0,
    pastEvents: -1
  };

  events: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.showEvents();
  }

  showEvents() {
    this.eventService.searchEvents(this.searchParams).subscribe((response: any) => {
      const data = response.data;
      if (data.content) {
        this.events = data.content;
      }
    });
  }

}
