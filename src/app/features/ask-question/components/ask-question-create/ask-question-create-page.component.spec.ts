import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionCreatePageComponent } from './ask-question-create-page.component';

describe('ProductCreatePageComponent', () => {
  let component: AskQuestionCreatePageComponent;
  let fixture: ComponentFixture<AskQuestionCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
