import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoFormComponent } from './additional-info-form.component';

describe('AdditionalInfoFormComponent', () => {
  let component: AdditionalInfoFormComponent;
  let fixture: ComponentFixture<AdditionalInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
