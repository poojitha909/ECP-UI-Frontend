import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailCardComponent } from './service-detail-card.component';
import { CoreModule } from 'src/app/core';

describe('ServiceDetailCardComponent', () => {
  let component: ServiceDetailCardComponent;
  let fixture: ComponentFixture<ServiceDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ServiceDetailCardComponent]
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
