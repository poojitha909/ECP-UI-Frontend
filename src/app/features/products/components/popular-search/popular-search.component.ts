import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.scss']
})
export class PopularSearchComponent implements OnInit {
  currentRate = 4;
  constructor() { }

  ngOnInit() {
  }

}
