import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.scss']
})
export class PopularSearchComponent implements OnInit {
  currentRate = 4;
  @Input() products: any[];

  constructor() { }

  ngOnInit() {
  }

}
