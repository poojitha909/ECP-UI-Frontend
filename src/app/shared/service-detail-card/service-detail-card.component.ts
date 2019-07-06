import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-detail-card',
  templateUrl: './service-detail-card.component.html',
  styleUrls: ['./service-detail-card.component.scss']
})
export class ServiceDetailCardComponent implements OnInit {

  @Input() service: any;
  currentRate = 3;

  constructor() { }

  ngOnInit() {
  }

}
