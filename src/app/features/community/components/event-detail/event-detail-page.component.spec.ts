import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventDetailPageComponent } from './event-detail-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventDetailPageComponent', () => {
  let component: EventDetailPageComponent;
  let fixture: ComponentFixture<EventDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [EventDetailPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
