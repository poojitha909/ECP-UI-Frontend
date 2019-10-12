import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { EventService } from '../../services/events.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {

  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Community',
      link: '/community'
    },
    {
      text: 'All Events',
      link: '/community/events'
    }
  ];
  eventId: string;
  event: any;
  reportEmail: string;
  showOrg: boolean;
  user: any;
  markIt: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService, private store: StorageHelperService, private authService: AuthService) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.getEvent()
    this.reportEmail = "admin@socialpha.com";
    this.showOrg = false;
    this.user = this.store.retrieve("ECP-USER");
    this.markIt = false;
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }

  getEvent() {
    this.eventService.getEvent(this.eventId).subscribe((response: any) => {
      const data = response.data;
      if (data) {
        this.event = data;
        const fav = this.user.favEvents.filter(elem => elem == this.event.id);
        if (fav) {
          this.markIt = true;
        }
        else {
          this.markIt = false;
        }
      }
    });
  }

  showOrganiserDetails() {
    this.showOrg = !this.showOrg;
  }

  markFavourite() {
    if (this.user) {
      this.markIt = !this.markIt;
      this.eventService.markFav(this.user.id, this.event.id, this.markIt).subscribe((response: any) => {
        const favEvs = response.data;
        this.markIt = false;
        for (let ev of favEvs) {
          if (ev == this.event.id) {
            this.markIt = true;
          }
        }
      })
    }
    else {
      this.authService.redirectUrl = "community/event/" + this.eventId;
      this.router.navigate(['/user/signin']);
    }
  }
}