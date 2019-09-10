import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events.service';
import {MenuService} from '../../services/menu.service';
import {Router} from "@angular/router";
import {StorageHelperService} from "../../../../core/services/storage-helper.service";
import {AuthService} from "../../../../core/auth/services/auth.service";
declare var UIKit;

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss']
})
export class EventCreatePageComponent implements OnInit {

  categoryList: any[];
  title: string;
  date: string;
  startTime: string;
  duration: string;
  description: string;
  address: string;
  landmark: string;
  orgEmail: string;
  orgPhone: string;
  capacity: string;
  entryFee: string;
  eventType: string;
  languages: string;
  organiser: string;
  user: any;

  constructor(private router: Router, private eventService: EventService, private menuService: MenuService, private store: StorageHelperService, private authService: AuthService) { }

  ngOnInit() {
    this.categoryList = [];
    this.title = "";
    this.description = "";
    this.date = "";
    this.startTime = "";
    this.duration = "";
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.eventType = "";
    this.entryFee = "";
    this.languages = "";
    this.organiser = "";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
    }
    let event = this.store.retrieve("new-event");
    if(event){
      event = JSON.parse(event);
      this.title = event.title;
      this.date = event.date;
      this.startTime = event.startTime;
      this.duration = event.duration;
      this.description = event.description;
      this.address = event.address;
      this.landmark = event.landmark;
      this.orgEmail = event.orgEmail;
      this.orgPhone = event.orgPhone;
      this.capacity = event.capacity;
      this.eventType = event.entryType;
      this.entryFee = event.entryFee;
      this.languages = "";
      this.organiser = "";
      this.store.clear("new-discuss");
    }
  }

  onReset(){
    this.title = "";
    this.date = "";
    this.startTime = "";
    this.duration = "";
    this.description = "";
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.eventType = "";
    this.entryFee = "";
    this.languages = "";
    this.organiser = "";
    this.router.navigate(['/community/events']);
  }
  
  onSubmit(){
    if(!this.user){
    
      this.store.store("new-event", JSON.stringify(
        { title: this.title,
          date: this.date,
          startTime: this.startTime,
          duration: this.duration,
          description: this.description,
          address: this.address,
          landmark: this.landmark,
          orgEmail: this.orgEmail,
          orgPhone: this.orgPhone,
          capacity: this.capacity,
          entryType: this.eventType,
          entryFee: this.entryFee,
          languages: this.languages,
          organiser: this.organiser,
        }
      ));
      this.authService.redirectUrl = "/community/event/add";
      this.router.navigate(['/user/signin']);
      return;
    }
    
    if(this.eventType != "" && this.title!= "" && this.description!= ""){
      this.eventService.addEvents({
        "title": this.title,
        "datetime": this.date + "T" + this.startTime + "+05:30",
        "duration": this.duration,
        "description": this.description,
        "capacity": this.capacity,
        "entryFee": this.entryFee,
        "eventType": this.eventType,
        "status": 1,
        "address": this.address,
        "landmark": this.landmark,
        "languages": this.languages,
        "organiser": this.organiser,
        "orgPhone": this.orgPhone,
        "orgEmail": this.orgEmail
        }).subscribe( (response:any) => {
        if(response.data.id != ""){
          this.router.navigate(['/community/events']);
        }
        else{
          alert("Oops! something wrong happen, please try again.");            
        }
      });
    }
    else{
      alert("All fields are required, please fill all fields.");
    }
  }
}