import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AskQuestionExpertsComponent } from './all-ask-question.component';

describe('AskQuestionExpertsComponent', () => {
  let component: AskQuestionExpertsComponent;
  let fixture: ComponentFixture<AskQuestionExpertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AskQuestionExpertsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
