import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductResultsComponent } from './product-results.component';

describe('ProductResultsComponent', () => {
  let component: ProductResultsComponent;
  let fixture: ComponentFixture<ProductResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductResultsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
