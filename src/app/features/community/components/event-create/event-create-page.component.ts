import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import moment from 'moment';
import { UserService } from 'src/app/features/user/services/user.service';

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
      link: '/community',
      queryParams: { 
        show: "events"}
    }
  ];
  categoryList: any[];
  eventForm: FormGroup;
  successMessage: string;
  user: any;
  selectedValue: any = '';

  minDate = moment(new Date()).add(1,'days').format('YYYY-MM-DD')
  languages:any[];
  constructor(private router: Router, private store: StorageHelperService,
    private fb: FormBuilder, private authService: AuthService,private userService:UserService) { }

  ngOnInit() {
    document.getElementById("addEventHeading").focus();
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
      title: [event ? event.title : "", Validators.required],
      date: [event ? event.date : "", Validators.required],
      startTime: [event ? event.startTime : "", Validators.required],
      duration: [event ? event.duration : "", Validators.required],
      description: [event ? event.description : "", Validators.required],
      address: [event ? event.address : "", Validators.required],
      landmark: [event ? event.landmark : ""],
      orgEmail: [event ? event.orgEmail : "", Validators.required],
      orgPhone: [event ? event.orgPhone : "", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      capacity: [event ? event.capacity : "", Validators.required],
      eventType: [event ? event.eventType : "", Validators.required],
      entryFee: [event ? event.entryFee : "", Validators.required],

      languages: [event ? event.languages : "", Validators.required],
      organiser: [event ? event.organiser : "", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
    });

    this.eventType.valueChanges.subscribe(value=>{
      if(value == 3) {
        this.address.patchValue("Online Event");
        this.address.updateValueAndValidity();
        this.capacity.setValidators(null);
        this.capacity.updateValueAndValidity();
       this.languagesField.setValidators(null);
       this.languagesField.updateValueAndValidity();
       this.orgPhone.setValidators([Validators.minLength(10),Validators.maxLength(10)]);
       this.orgPhone.updateValueAndValidity();
      }
    })


    this.userService.profileLanguages().subscribe(response => {
      if (response) {
        this.languages = [];
        response.map( (lang) => {
          this.languages[this.languages.length] =  lang.name 
        })
      }
    });
  }

  get eventType(): FormControl {
    return this.eventForm.get("eventType") as FormControl;
  }
  get address(): FormControl {
    return this.eventForm.get("address") as FormControl;
  }

  get orgPhone(): FormControl{
    return this.eventForm.get("orgPhone") as FormControl;
  }
  get capacity(): FormControl{
    return this.eventForm.get("capacity") as FormControl;
  }
  get languagesField(): FormControl{
    return this.eventForm.get("languages") as FormControl;
  }

  get formControl() {
    return this.eventForm.controls;
  }


  addLangFn(name) {
    return { id: 0, name: name };
  }

  addLanguage(lang) {
    if (lang.name) {
      const language = this.languages.find(value => lang.name.toLowerCase() === value.name.toLowerCase());
      if (!language) {
        this.userService.profileLanguages(lang.name).subscribe(response => {
          if (response) {
            this.languages = response;
          }
        });
      }
    }
  }

  onReset() {
    this.successMessage = "";
    this.eventForm.reset();
    this.router.navigate(['/community'],{queryParams:{show: 'events' }});
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
    this.router.navigate(['/community/event/preview',{id:'preview'}]);
  }
}