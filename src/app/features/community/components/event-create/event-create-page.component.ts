import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/events.service';
import {MenuService} from '../../services/menu.service';
import {Router} from "@angular/router";
import {StorageHelperService} from "../../../../core/services/storage-helper.service";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss']
})
export class EventCreatePageComponent implements OnInit {

  categoryList: any[];
  title: string;
  description: string;
  datetime: Date;
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

  constructor(private router: Router, private eventService: EventService, private menuService: MenuService, private store: StorageHelperService) { }

  ngOnInit() {
    this.categoryList = [];
    this.title = "";
    this.description = "";
    this.datetime = new Date();
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.eventType = "";
    this.entryFee = "";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
    }
    let event = this.store.retrieve("new-event");
    if(event){
      event = JSON.parse(event);
      this.title = event.title;
      this.description = event.description;
      this.address = event.address;
      this.landmark = event.landmark;
      this.orgEmail = event.orgEmail;
      this.orgPhone = event.orgPhone;
      this.capacity = event.capacity;
      this.eventType = event.entryType;
      this.entryFee = event.entryFee;
      this.store.clear("new-discuss");
    }
  }

  onReset(){
    this.title = "";
    this.description = "";
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.eventType = "";
    this.entryFee = "";
  }
  
  onSubmit(){
    if(!this.user){
    
      this.store.store("new-event", JSON.stringify(
        { title: this.title,
          description: this.description,
          address: this.address,
          landmark: this.landmark,
          orgEmail: this.orgEmail,
          orgPhone: this.orgPhone,
          capacity: this.capacity,
          entryType: this.eventType,
          entryFee: this.entryFee,
          languages: this.languages,
          organiser: this.organiser
        }
      ));
      this.router.navigate(['/user/signin']);
      return;
    }
    
    if(this.eventType != "" && this.title!= "" && this.description!= ""){
      this.eventService.addEvents({
        "title": this.title,
        "datetime": this.datetime,
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