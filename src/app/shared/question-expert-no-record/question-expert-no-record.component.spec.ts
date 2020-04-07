import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionExpertNoRecordComponent } from './question-expert-no-record.component';

describe('ExpertNoRecordComponent', () => {
  let component: QuestionExpertNoRecordComponent;
  let fixture: ComponentFixture<QuestionExpertNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionExpertNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionExpertNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
