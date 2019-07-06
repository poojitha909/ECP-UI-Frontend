import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  @Input() services: any[];

  constructor() { }

  ngOnInit() {
  }

}
