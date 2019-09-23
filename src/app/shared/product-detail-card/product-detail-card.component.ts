import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent implements OnInit {
  currentRate = 4;
  @Input() product: any;
  constructor() { }

  ngOnInit() {
  }

}
