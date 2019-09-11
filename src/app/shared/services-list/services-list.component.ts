import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/core/interfaces';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  @Input() services: Service[];

  constructor() { }

  ngOnInit() {
  }

}
