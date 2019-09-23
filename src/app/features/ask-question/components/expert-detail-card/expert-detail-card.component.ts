import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expert-detail-card',
  templateUrl: './expert-detail-card.component.html',
  styleUrls: ['./expert-detail-card.component.scss']
})
export class ExpertDetailCardComponent implements OnInit {
  @Input() expert: any;
  constructor() { }

  ngOnInit() {
  }

}
