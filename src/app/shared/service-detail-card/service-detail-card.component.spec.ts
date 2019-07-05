import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailCardComponent } from './service-detail-card.component';

describe('ServiceDetailCardComponent', () => {
  let component: ServiceDetailCardComponent;
  let fixture: ComponentFixture<ServiceDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
