import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionNoRecordComponent } from './discussion-no-record.component';

describe('DiscussionNoRecordComponent', () => {
  let component: DiscussionNoRecordComponent;
  let fixture: ComponentFixture<DiscussionNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
