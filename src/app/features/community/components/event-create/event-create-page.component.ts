import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss']
})
export class EventCreatePageComponent implements OnInit {
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
      link: '/community/events'
    }
  ];
  categoryList: any[];
  eventForm: FormGroup;
  successMessage: string;
  user: any;

  constructor(private router: Router, private store: StorageHelperService, 
    private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.categoryList = [];
    this.successMessage = "";
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    let event = this.store.retrieve("new-event");
    if (event) {
      event = JSON.parse(event);
      this.store.clear("new-event");
    }
    this.eventForm = this.fb.group({
      title:  [event ? event.title : "", Validators.required],
      date:  [event ? event.date : "", Validators.required],
      startTime:  [event ? event.startTime : "", Validators.required],
      duration:  [event ? event.duration : "", Validators.required],
      description:  [event ? event.description : "", Validators.required],
      address:  [event ? event.address : "", Validators.required],
      landmark:  [event ? event.landmark : ""],
      //orgEmail:  [event ? event.orgEmail : "", [Validators.required,Validators.email]],
      orgEmail:  [event ? event.orgEmail : ""],
      //orgPhone:  [event ? event.orgPhone : "", [Validators.required,Validators.pattern(/^\+?\d{1,2}[- ]?\d{2}[- ]?\d{4}[- ]?\d{4}$/)] ],
      orgPhone:  [event ? event.orgPhone : "", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      capacity:  [event ? event.capacity : "", Validators.required],
      eventType:  [event ? event.eventType : "", Validators.required],
      entryFee:  [event ? event.entryFee : "", Validators.required],
      languages:  [event ? event.languages : "", Validators.required],
      organiser:  [event ? event.organiser : "", Validators.required]
    });
  }
  
  get formControl() {
    return this.eventForm.controls;
  }

  onReset() {
    this.successMessage = "";
    this.eventForm.reset();
    this.router.navigate(['/community/events']);
  }

  onSubmit() {
    this.successMessage = "";
    
    this.store.store("new-event", JSON.stringify( this.eventForm.value ));
    if (!this.user) {
      this.authService.redirectUrl = "/community/event/add";
      this.router.navigate(['/user/signin']);
      return;
    }

    Object.keys(this.eventForm.controls).forEach(field => {
      const control = this.eventForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.eventForm.valid) {
      return;
    }
    
    let event = { ...this.eventForm.value };
    event.datetime = event.date + "T" + event.startTime + "+05:30";
    event.status = 1;
    delete event.date;
    delete event.startTime;

    this.store.store("new-event-preview", JSON.stringify( event ));
    this.router.navigate(['/community/event/preview']);
    // this.eventService.addEvents( event ).subscribe((response: any) => {
    //   if (response.data.id != "") {
    //     //this.router.navigate(['/community/events']);
    //     this.eventForm.reset();
    //     this.successMessage = "Event submittted successfully for review, once reviewed it will start appearing on site."
    //   }
    //   else {
    //     alert("Oops! something wrong happen, please try again.");
    //   }
    // });
  }
}