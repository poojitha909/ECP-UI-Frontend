import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskExpertSummaryCardComponent } from './ask-expert-summary-card.component';

describe('AskExpertSummaryCardComponent', () => {
  let component: AskExpertSummaryCardComponent;
  let fixture: ComponentFixture<AskExpertSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskExpertSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskExpertSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
