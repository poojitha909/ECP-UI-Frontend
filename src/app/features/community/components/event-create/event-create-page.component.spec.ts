import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatePageComponent } from './event-create-page.component';

describe('EventCreateComponent', () => {
  let component: EventCreatePageComponent;
  let fixture: ComponentFixture<EventCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
