import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNoRecordComponent } from './question-no-record.component';

describe('ExpertNoRecordComponent', () => {
  let component: QuestionNoRecordComponent;
  let fixture: ComponentFixture<QuestionNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
