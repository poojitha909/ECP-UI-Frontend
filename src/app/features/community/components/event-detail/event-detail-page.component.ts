import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { EventService } from '../../services/events.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from "angular-notifier";
declare var UIkit: any;

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
      text: 'Engage with us',
      link: '/community'
    },
    {
      text: 'All Events',
      link: '/community',
      queryParams: { 
        show: "events"}
    }
  ];
  eventId: string;
  event: any;
  showOrg: boolean;
  user: any;
  markIt: boolean;
  paramsSubs: any;
  currentUrl: string;
  whatsappUrl;
  whatsappMobileUrl;
  eventReportForm: FormGroup;
  successMessage: string;
  publish: boolean = false;
  ShowReportEvent: boolean = true;
  private readonly notifier: NotifierService;
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  @ViewChild("customNotification1", { static: true }) customNotificationTmpl1;


  constructor(private router: Router, private route: ActivatedRoute,
    private eventService: EventService, private store: StorageHelperService,
    private authService: AuthService, public sanitizer: DomSanitizer,
    private seoService: SeoService, private fb: FormBuilder, notifierService: NotifierService) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
      if (this.route.snapshot.params['id'] == 'preview') {
        this.ShowReportEvent = false;
      }
    });

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
    this.user = this.store.retrieve("ECP-USER");
    this.markIt = false;
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    this.eventReportForm = this.fb.group({
      eventId: this.eventId,
      userId: this.user ? this.user.id : "",
      comment: ["", Validators.required],
    });

    this.breadcrumbLinks[2].queryParams = this.route.snapshot.queryParams;
  }

  getEvent() {
    if (this.eventId == "preview") {
      this.event = this.store.retrieve("new-event-preview");
      this.event = JSON.parse(this.event);
      setTimeout(() => {
        document.getElementById("eventHeader").focus();
      }, 500);
    }
    else {
      this.eventService.getEvent(this.eventId).subscribe((response: any) => {
        const data = response.data;
        if (data) {
          this.setSeoTags(data);
          this.event = data;
          if (this.user) {
            const fav = this.user.favEvents.filter(elem => elem == this.event.id);
            if (fav) {
              this.markIt = true;
            }
            else {
              this.markIt = false;
            }
          }

          setTimeout(() => {
            document.getElementById("eventHeader").focus();
          }, 500);
        }
      });
    }
  }

  setSeoTags(event: any) {
    const config: SEO = {
      title: `Event Details- ${event.title}`,
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

  // onPublish() {
  //   if (!this.user) {
  //     this.authService.redirectUrl = "community/event/preview";
  //     this.router.navigate(['/user/signin']);
  //     return;
  //   }
  //   this.eventService.addEvents(this.event).subscribe((response: any) => {
  //     if (response.data.id != "") {
  //       this.store.clear("new-event");
  //       this.store.clear("new-event-preview");
  //       this.router.navigate(['/community/events']);
  //       //this.successMessage = "Event submittted successfully for review, once reviewed it will start appearing on site."
  //     }
  //     else {
  //       alert("Oops! something wrong happen, please try again.");
  //     }
  //   });
  // }
  onPublish() {
    if (!this.user) {
      this.authService.redirectUrl = "community/event/preview";
      this.router.navigate(['/user/signin']);
      return;
    }
    this.notifier.show({
      message: "Please wait, we are submitting your event to Admin",
      type: "info",
      template: this.customNotificationTmpl
    });

    setTimeout(() => {
      this.eventService.addEvents(this.event).subscribe((response: any) => {
        if (response.data.id != "") {
          this.notifier.show({
            message: "Your event has created successfully submitted for the review process",
            type: "success",
            template: this.customNotificationTmpl1
          });
          this.store.clear("new-event");
          this.store.clear("new-event-preview");
        }
        else {
          alert("Oops! something wrong happen, please try again.");
        }
      })

    }, 2200)

    setTimeout(() => {
      this.router.navigate(['/community'], {
        queryParams: {
          show: "events"
        }
      });
    }, 4500)

  }

  //   this.eventService.addEvents(this.event).subscribe((response: any) => {
  //     if (response.data.id != "") {
  //       this.store.clear("new-event");
  //       this.store.clear("new-event-preview");
  //       this.router.navigate(['/community/events']);
  //       //this.successMessage = "Event submittted successfully for review, once reviewed it will start appearing on site."
  //     }
  //     else {
  //       alert("Oops! something wrong happen, please try again.");
  //     }
  //   });
  // }


  reportFormToggle() {
    if (this.user) {
      UIkit.modal('#event-report-modal').show();
    } else {
      this.authService.redirectUrl = this.router.url;
      this.router.navigateByUrl('/user/signin');
    }
  }
  onSubmitReport() {
    if (this.user) {
      this.eventService.reportEvent(this.eventReportForm.value).subscribe(
        response => {
          if (response) {
            this.eventReportForm.reset();
            this.successMessage = "Event report was sent to site admin successfully."
            setTimeout(() => {
              UIkit.modal('#event-report-modal').hide();
            }, 5000);
          }
        },
        error => {
          console.log(error);
        });
      console.log(this.eventReportForm.value);
    } else {
      this.authService.redirectUrl = this.router.url;
      this.router.navigateByUrl('/user/signin');
    }
  }
}