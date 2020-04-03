import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEventResultsComponent } from './no-event-results.component';

describe('NoEventResultsComponent', () => {
  let component: NoEventResultsComponent;
  let fixture: ComponentFixture<NoEventResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEventResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEventResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
