import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReviewComponent } from './no-review.component';

describe('NoReviewComponent', () => {
  let component: NoReviewComponent;
  let fixture: ComponentFixture<NoReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
