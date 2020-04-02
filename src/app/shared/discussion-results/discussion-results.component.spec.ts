import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionResultsComponent } from './discussion-results.component';

describe('DiscussionResultsComponent', () => {
  let component: DiscussionResultsComponent;
  let fixture: ComponentFixture<DiscussionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
