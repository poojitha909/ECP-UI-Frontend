import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core';
import { DBReviews } from 'src/app/core/interfaces';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {
  @Input() userId: string;
  @Input() dbReview: DBReviews[];
  @Output() likeReview: EventEmitter<any> = new EventEmitter();
  @Output() submitEditForm: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService) { }

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

  userUpvoted(likeCount): boolean {
    if (likeCount && this.auth.user) {
      const index = likeCount.findIndex(val => val === this.userId);
      if (index !== -1) {
        return true;
      }
    }
    return false;
  }

  likeUnlikeReview(reviewId: string) {
    this.likeReview.emit(reviewId);
  }

  editReview(review: any) {
    this.submitEditForm.emit(review);

  }

}
