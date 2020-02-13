import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddressDetailsComponent } from './view-address-details.component';

describe('ViewAddressDetailsComponent', () => {
  let component: ViewAddressDetailsComponent;
  let fixture: ComponentFixture<ViewAddressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAddressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
