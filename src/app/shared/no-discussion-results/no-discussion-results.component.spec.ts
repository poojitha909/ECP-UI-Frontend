import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDiscussionResultsComponent } from './no-discussion-results.component';

describe('NoDiscussionResultsComponent', () => {
  let component: NoDiscussionResultsComponent;
  let fixture: ComponentFixture<NoDiscussionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDiscussionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDiscussionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
