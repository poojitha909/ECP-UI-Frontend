import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchListPageComponent } from './event-search-list-page.component';

describe('EventSearchListPageComponent', () => {
  let component: EventSearchListPageComponent;
  let fixture: ComponentFixture<EventSearchListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSearchListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
