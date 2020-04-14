import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dicussion-summary-card',
  templateUrl: './dicussion-summary-card.component.html',
  styleUrls: ['./dicussion-summary-card.component.scss']
})
export class DicussionSummaryCardComponent implements OnInit {

  @Input() discussion: any;
  @Input() category: string;
  @Input() pageParam: Object;

  constructor() { }

  ngOnInit() { }

}
