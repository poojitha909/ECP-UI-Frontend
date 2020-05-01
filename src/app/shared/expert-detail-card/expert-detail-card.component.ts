import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageHelperService } from 'src/app/core/services/storage-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-detail-card',
  templateUrl: './expert-detail-card.component.html',
  styleUrls: ['./expert-detail-card.component.scss']
})
export class ExpertDetailCardComponent implements OnInit {
  @Input() expert: any;
  @Input() pageParam: Object;
  @Output() categoryChange: EventEmitter<string> = new EventEmitter();
  user:any;
  isSame: boolean;


  expertfullName:any;
  constructor( private store: StorageHelperService ,private route :Router) { }

  ngOnInit() {
    this.expertfullName=this.expert.basicProfileInfo.firstName;
    this.isSame = false;
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);  
      if (this.user.id == this.expert.userId) {
        this.isSame = true;
        this.pageParam['show'] = "expques";
        this.pageParam['page'] = "";
      }
    }

  }
  onclick(e,experties){
    e.stopPropagation();
    this.categoryChange.emit(experties[0].id);
} 
 

  /**
   * TODO: method to be removed
   */
  setDefaultPic(e) {
    e.target.src = "assets/images/default-thumbnail.png";
  }

 




}
