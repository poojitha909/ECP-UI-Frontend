import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMyQuestionsComponent } from './featured-my-questions.component';

describe('FeaturedMyQuestionsComponent', () => {
  let component: FeaturedMyQuestionsComponent;
  let fixture: ComponentFixture<FeaturedMyQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedMyQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedMyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
