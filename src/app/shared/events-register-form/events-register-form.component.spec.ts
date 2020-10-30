import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRegisterFormComponent } from './events-register-form.component';

describe('EventsRegisterFormComponent', () => {
  let component: EventsRegisterFormComponent;
  let fixture: ComponentFixture<EventsRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
