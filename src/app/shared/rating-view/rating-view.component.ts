import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.scss']
})
export class RatingViewComponent implements OnInit {
  @Input() detailReview: any;
  @Input() dbReviewCount: number;
  @Input() jdDetailReview: any;
  constructor() { }

  ngOnInit() {
  }

}
