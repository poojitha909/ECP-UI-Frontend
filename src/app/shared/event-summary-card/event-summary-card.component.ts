import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-event-summary-card',
  templateUrl: './event-summary-card.component.html',
  styleUrls: ['./event-summary-card.component.scss']
})
export class EventSummaryCardComponent implements OnInit,OnChanges {

 
  @Input() event: any;
  @Input() isPast: number;
  @Input() pageParam:Object;

  isShow:boolean;

  constructor() {
   
   }
  ngOnInit() {
       
  }    
  ngOnChanges(){
    if(this.isPast==-1){
      this.isShow=true
    }
    
  }
   
}
