import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBRating } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() userRating: DBRating;
  @Input() ratingOf: String;
  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  ratingForm: FormGroup;
  btnText: string;
  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.ratingForm = this.fb.group({
      serviceId: [""],
      rating: ["", Validators.required]
    })
  }

  ngOnInit() {

    this.auth.userSource.subscribe(
      user => {
        if (!user) {
          this.userRating = null;
          this.btnText = 'Signin to Submit';
          this.ratingForm.controls.rating.setValue('');
        }
      });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges) {
      if (this.auth.isAuthenticate) {
        console.log(this.userRating);
        this.userRating ? this.btnText = 'Edit Rating' : this.btnText = 'Submit';
      } else {
        this.btnText = 'Signin to Submit';
      }
    }
  }

  ngAfterViewInit() {
    if (this.auth.serviceRatingForm) {
      this.ratingForm.patchValue(this.auth.serviceRatingForm);
      this.auth.removeServiceRatingForm();
    }

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
