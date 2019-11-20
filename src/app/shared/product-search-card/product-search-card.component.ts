import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-search-card',
  templateUrl: './product-search-card.component.html',
  styleUrls: ['./product-search-card.component.scss']
})
export class ProductSearchCardComponent implements OnInit {

  @Input() product: any;
  constructor() { }

  ngOnInit() {
  }


  getDbServiceRating(percent): number {
    if (percent == 0) {
      return 0;
    } else if (percent <= 20) {
      return 1;
    } else if (percent <= 40) {
      return 2;
    } else if (percent <= 60) {
      return 3;
    } else if (percent <= 80) {
      return 4;
    } else if (percent <= 100) {
      return 5;
    }
  }
}
