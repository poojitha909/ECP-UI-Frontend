import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-detail-card',
  templateUrl: './service-detail-card.component.html',
  styleUrls: ['./service-detail-card.component.scss']
})
export class ServiceDetailCardComponent implements OnInit {

  @Input() service: Service;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }

  navigate() {
    this.router.navigate(['/services/detail'], {
      state: { service: this.service, isDBService: this.isDBService }
    });
  }

}
