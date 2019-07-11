import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionPageComponent } from './ask-question-page.component';

describe('AskQuestionPageComponent', () => {
  let component: AskQuestionPageComponent;
  let fixture: ComponentFixture<AskQuestionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
