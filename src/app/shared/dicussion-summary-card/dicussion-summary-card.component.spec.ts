import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicussionSummaryCardComponent } from './dicussion-summary-card.component';

describe('DicussionSummaryCardComponent', () => {
  let component: DicussionSummaryCardComponent;
  let fixture: ComponentFixture<DicussionSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicussionSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicussionSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
