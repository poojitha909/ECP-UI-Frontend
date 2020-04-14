import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent implements OnInit {
  @Input() product: any;
  @Input() pageParam:Object;
  @Output() categoryChange: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  onclick(e,product){
    e.stopPropagation();
    this.categoryChange.emit(product.productCategory.id);
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
