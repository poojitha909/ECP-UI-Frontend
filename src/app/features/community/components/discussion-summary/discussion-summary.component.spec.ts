import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionSummaryComponent } from './discussion-summary.component';

describe('DiscussionSummaryComponent', () => {
  let component: DiscussionSummaryComponent;
  let fixture: ComponentFixture<DiscussionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
