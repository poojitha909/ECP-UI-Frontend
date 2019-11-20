import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSummaryCardComponent } from './event-summary-card.component';

describe('EventSummaryCardComponent', () => {
  let component: EventSummaryCardComponent;
  let fixture: ComponentFixture<EventSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
