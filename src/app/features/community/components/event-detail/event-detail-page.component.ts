import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import EventService from '../../services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {

  eventId: string;
  event: any;
  constructor(private route:ActivatedRoute,private eventService: EventService) { }
  
  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.getEvent()
  }

  getEvent(){
    this.eventService.getEvent(this.eventId).subscribe( (response:any) =>{
      const data = response.data;
      console.log(data);
      if(data){
        this.event = data;
      }
    });
  }
}