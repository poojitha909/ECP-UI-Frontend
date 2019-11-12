import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { EventService } from '../../services/events.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

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
  paramsSubs: any;
  currentUrl: string;
  whatsappUrl;

  constructor(private router: Router, private route: ActivatedRoute, 
    private eventService: EventService, private store: StorageHelperService, 
    private authService: AuthService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }
  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate(){
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
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
    if(this.eventId == "preview"){
      this.event = this.store.retrieve("new-event-preview");
      this.event = JSON.parse(this.event);
    }
    else{
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

  onCancelPublish(){
    this.router.navigate(["community/event/add"]);
  }

  onPublish(){
    if(!this.user) {
      this.authService.redirectUrl = "community/event/preview";
      this.router.navigate(['/user/signin']);
      return;
    }
    this.eventService.addEvents( this.event ).subscribe((response: any) => {
      if (response.data.id != "") {
        this.store.clear("new-event");
        this.store.clear("new-event-preview");
        this.router.navigate(['/community/events']);
        //this.successMessage = "Event submittted successfully for review, once reviewed it will start appearing on site."
      }
      else {
        alert("Oops! something wrong happen, please try again.");
      }
    });
  }
}