import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchCardComponent } from './product-search-card.component';

describe('ProductSearchCardComponent', () => {
  let component: ProductSearchCardComponent;
  let fixture: ComponentFixture<ProductSearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
