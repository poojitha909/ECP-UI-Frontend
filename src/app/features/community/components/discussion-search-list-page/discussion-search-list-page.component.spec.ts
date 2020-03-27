import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionSearchListPageComponent } from './discussion-search-list-page.component';

describe('DiscussionSearchListPageComponent', () => {
  let component: DiscussionSearchListPageComponent;
  let fixture: ComponentFixture<DiscussionSearchListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionSearchListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionSearchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
