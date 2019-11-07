import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBRating } from 'src/app/core/interfaces';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  @Input() userRating: DBRating;
  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  ratingForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.ratingForm = this.fb.group({
      serviceId: [""],
      rating: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  onRatingSubmit() {
    if (this.userRating) {
      this.ratingForm.controls.rating.setValue(this.getDbServiceRating(this.userRating.rating));
    }
    this.submitForm.emit(this.ratingForm.value);
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
