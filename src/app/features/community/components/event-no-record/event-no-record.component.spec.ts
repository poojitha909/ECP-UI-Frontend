import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNoRecordComponent } from './event-no-record.component';

describe('EventNoRecordComponent', () => {
  let component: EventNoRecordComponent;
  let fixture: ComponentFixture<EventNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
