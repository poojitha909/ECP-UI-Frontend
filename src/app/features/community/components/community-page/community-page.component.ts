import { Component, OnInit } from '@angular/core';
import { PageParam } from 'src/app/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import EventService from '../../services/events.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  showReset: boolean;
  searchValue: string;
  searchParams: {
    p: number,
    s: number,
    searchTxt: string,
    eventType: number,
  }

  events$: Observable<any[]>;
  private searchEventsTerms = new BehaviorSubject<any>(null);
 
  constructor(private http: HttpClient, private eventService: EventService) {
  }


  ngOnInit(): void {
    this.events$ = this.searchEventsTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: any) => { return this.eventService.searchEvents(term);}),
    );
  }

  onSearchChange(value) {
    if (value !== "") {
      this.showReset = true
    } else {
      this.showReset = false;
    }
    this.searchValue = value;
  }

  resetSearch() {
    this.searchValue = "";
    this.showReset = false;
  }

  onSearch() {
    this.searchParams = {
      p: 0,
      s: 3,
      searchTxt: this.searchValue,
      eventType: 0,
    }
    console.log(this.searchParams);
    this.searchEventsTerms.next(this.searchParams);
  }
}