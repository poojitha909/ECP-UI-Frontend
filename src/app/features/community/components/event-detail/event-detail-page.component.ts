import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { EventService } from '../../services/events.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
declare var UIkit: any;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit, AfterViewInit {

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
  whatsappMobileUrl;

  constructor(private router: Router, private route: ActivatedRoute,
    private eventService: EventService, private store: StorageHelperService,
    private authService: AuthService, public sanitizer: DomSanitizer,
    private seoService: SeoService) { }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
    document.getElementById("eventHeader").focus();
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.whatsappMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.eventId = this.route.snapshot.params['id'];
    this.getEvent()
    this.reportEmail = "admin@socialpha.com";
    this.user = this.store.retrieve("ECP-USER");
    this.markIt = false;
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }

  getEvent() {
    if (this.eventId == "preview") {
      this.event = this.store.retrieve("new-event-preview");
      this.event = JSON.parse(this.event);
    }
    else {
      this.eventService.getEvent(this.eventId).subscribe((response: any) => {
        const data = response.data;
        if (data) {
          this.setSeoTags(data);
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

  setSeoTags(event: any) {
    const config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Event ${event.title}`,
      keywords: 'products,services,events,dscussions',
      description: `${event.description}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    this.seoService.generateTags(config);
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

  onCancelPublish() {
    this.router.navigate(["community/event/add"]);
  }

  onPublish() {
    if (!this.user) {
      this.authService.redirectUrl = "community/event/preview";
      this.router.navigate(['/user/signin']);
      return;
    }
    this.eventService.addEvents(this.event).subscribe((response: any) => {
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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyHandler(event: KeyboardEvent) {
    this.onCloseModel();
  }

  onCloseModel() {
    document.getElementsByClassName("main-container")[0].removeAttribute("aria-hidden");
  }

  onOpenModel() {
    document.getElementsByClassName("main-container")[0].setAttribute("aria-hidden", "true");
  }

  openContactModel() {
    this.onOpenModel();
    UIkit.modal('#modal-sections-events').show();
    document.getElementById("eventContactitle").focus();
  }



}