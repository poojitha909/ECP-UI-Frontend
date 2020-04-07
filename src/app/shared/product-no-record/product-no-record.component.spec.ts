import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNoRecordComponent } from './product-no-record.component';

describe('ProductNoRecordComponent', () => {
  let component: ProductNoRecordComponent;
  let fixture: ComponentFixture<ProductNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
