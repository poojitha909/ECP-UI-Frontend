import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  styleUrls: ['./featured-events.component.scss']
})
export class FeaturedEventsComponent implements OnInit {
  event: any;
  isPast = -1;
  constructor() {
    // Test variable
    this.event = {
      "id": "5da6e67c0cf21304b1d4c399",
      "title": "Grandparents Singing Competition ",
      "datetime": 1671304600000,
      "description": "Grandparents Singing Competition going to happen soon!!!",
      "capacity": 30,
      "entryFee": 200,
      "eventType": 2,
      "status": 0,
      "address": "Koramangla",
      "landmark": "Forum Mall",
      "languages": "Hindi, Tamil, Telgu",
      "organiser": "Pulkit Sharma",
      "orgPhone": "+91 12 1234 1234",
      "orgEmail": "abc@socialalpha.org",
      "isPast": -1,
      "editableByUser": false
    };

  }

  ngOnInit() {
  }

}
