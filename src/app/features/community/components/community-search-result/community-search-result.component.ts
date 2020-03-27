import { Component, OnInit, Input ,ViewChild, ElementRef, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-community-search-result',
  templateUrl: './community-search-result.component.html',
  styleUrls: ['./community-search-result.component.scss']
})
export class CommunitySearchResultComponent implements OnInit {

  @Input() searchData: any;
  show:string;
  constructor() { 
    console.log(this.searchData,'SearchData in Community search page')
  }

  ngOnInit() {
    this.show ="discss";
  }
  showAll(tab) {
    console.log(tab)
    this.show=tab
  }

}
