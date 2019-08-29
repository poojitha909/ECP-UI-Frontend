import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  selCategory: string;
  categoryList: any[];
  title: string;
  description: string;
  address: string;
  landmark: string;
  orgEmail: string;
  orgPhone: string;
  capacity: string;
  entrytype: string;
  user: any;

  constructor(private route:ActivatedRoute,private router: Router, private eventService: EventService, private menuService: MenuService, private store: StorageHelperService) { }

  ngOnInit() {
    this.selCategory = "";
    this.categoryList = [];
    this.title = "";
    this.description = "";
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.entrytype = "";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
    }
    let event = this.store.retrieve("new-event");
    if(event){
      event = JSON.parse(event);
      this.selCategory = event.selCategory;
      this.title = event.title;
      this.description = event.description;
      this.address = event.address;
      this.landmark = event.landmark;
      this.orgEmail = event.orgEmail;
      this.orgPhone = event.orgPhone;
      this.capacity = event.capacity;
      this.entrytype = event.entrytype;
      this.store.clear("new-discuss");
    }
  }

  onReset(){
    this.selCategory = "";
    this.title = "";
    this.description = "";
    this.address = "";
    this.landmark = "";
    this.orgEmail = "";
    this.orgPhone = "";
    this.capacity = "";
    this.entrytype = "";
  }
  
  onSubmit(){
    if(!this.user){
    
      this.store.store("new-event", JSON.stringify(
        { selCategory: this.selCategory,
          title: this.title,
          description: this.description,
          address: this.address,
          landmark: this.landmark,
          orgEmail: this.orgEmail,
          orgPhone: this.orgPhone,
          capacity: this.capacity,
          entrytype: this.entrytype}
      ));
      this.router.navigate(['/user/signin']);
      return;
    }

    if(this.selCategory != "" && this.title!= "" && this.description!= ""){
      // this.discussionService.addDiscussion("P", this.description, this.title, this.user.id, this.user.userName, 
      //       this.categoryList[ this.selCategory ].tags
      //       ,[ this.categoryList[ this.selCategory ].id ],
      //       0)
      //   .subscribe( (response:any) => {
      //     if(response.data.id != ""){
      //       this.router.navigate(['/community/discussion', response.data.id]);
      //     }
      //     else{
      //       alert("Oops! something wrong happen, please try again.");            
      //     }
      //   });
    }
    else{
      alert("All fields are required, please fill all fields.");
    }
  }

}