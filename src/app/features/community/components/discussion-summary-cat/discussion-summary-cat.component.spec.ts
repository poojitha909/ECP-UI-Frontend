import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionSummaryCatComponent } from './discussion-summary-cat.component';

describe('DiscussionSummaryCatComponent', () => {
  let component: DiscussionSummaryCatComponent;
  let fixture: ComponentFixture<DiscussionSummaryCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionSummaryCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionSummaryCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
