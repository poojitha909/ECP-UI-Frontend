import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/interfaces';

@Component({
  selector: 'app-service-search-card',
  templateUrl: './service-search-card.component.html',
  styleUrls: ['./service-search-card.component.scss']
})
export class ServiceSearchCardComponent implements OnInit {

  @Input() service: Service;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  get isDBService(): boolean {
    return this.service.hasOwnProperty('basicProfileInfo');
  }

  navigate() {
    if (this.isDBService) {
      this.router.navigate([`/services/${this.service.basicProfileInfo.firstName}/${this.service.id}/${this.isDBService}`]);
    } else {
      this.router.navigate([`/services/${this.service.name}/${this.service.docid}/${this.isDBService}`]);
    }
  }

  getDbServiceRating(percent): number {
    if (percent == 0) {
      return 0;
    } else if (percent <= 20) {
      return 1;
    } else if (percent <= 40) {
      return 2;
    } else if (percent <= 60) {
      return 3;
    } else if (percent <= 80) {
      return 4;
    } else if (percent <= 100) {
      return 5;
    }
  }

}
