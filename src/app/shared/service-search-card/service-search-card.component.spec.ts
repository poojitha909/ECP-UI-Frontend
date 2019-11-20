import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSearchCardComponent } from './service-search-card.component';

describe('ServiceSearchCardComponent', () => {
  let component: ServiceSearchCardComponent;
  let fixture: ComponentFixture<ServiceSearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSearchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
