import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionsSummaryCardComponent } from './my-questions-summary-card.component';

describe('MyQuestionsSummaryCardComponent', () => {
  let component: MyQuestionsSummaryCardComponent;
  let fixture: ComponentFixture<MyQuestionsSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuestionsSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionsSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
