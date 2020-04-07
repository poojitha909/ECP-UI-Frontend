import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesResultComponent } from './services-result.component';

describe('ServicesResultComponent', () => {
  let component: ServicesResultComponent;
  let fixture: ComponentFixture<ServicesResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
