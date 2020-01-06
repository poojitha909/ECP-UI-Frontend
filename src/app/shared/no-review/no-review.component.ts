import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';
declare var UIkit: any;
@Component({
  selector: 'app-no-review',
  templateUrl: './no-review.component.html',
  styleUrls: ['./no-review.component.scss']
})
export class NoReviewComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  writeNewReview() {
    if (this.auth.isAuthenticate) {
      UIkit.modal('#review-modal').show();
    } else {
      this.auth.redirectUrl = this.router.url;
      this.router.navigateByUrl('/user/signin');
    }
  }
}
