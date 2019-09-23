import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServicesListComponent } from './services-list.component';

describe('ServicesListComponent', () => {
  let component: ServicesListComponent;
  let fixture: ComponentFixture<ServicesListComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
