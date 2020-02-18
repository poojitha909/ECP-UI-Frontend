import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/features/community/services/events.service';
import { StorageHelperService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';

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


  constructor(
    private eventService: EventService,
    private storageHelper: StorageHelperService,
    private router: Router
  ) { }

  ngOnInit() {
    const featuredEventSession = this.storageHelper.retrieveSession(AppConstants.FEATURED_EVENT);
    if (featuredEventSession) {
      this.searchParams.pastEvents = featuredEventSession;
    }
    this.initiate();
  }

  initiate() {
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

  seeAllEvetns() {
    this.storageHelper.storeSession(AppConstants.FEATURED_EVENT, this.searchParams.pastEvents);
    this.router.navigate(["/community/events"], { queryParams: { past: this.searchParams.pastEvents } });
  }

}
