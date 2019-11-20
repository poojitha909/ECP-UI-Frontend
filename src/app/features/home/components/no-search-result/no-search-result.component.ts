import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-search-result',
  templateUrl: './no-search-result.component.html',
  styleUrls: ['./no-search-result.component.scss']
})
export class NoSearchResultComponent implements OnInit {
  @Input() tabName: string;
  @Input() viewLink: string;
  constructor() { }

  ngOnInit() {
  }

}
