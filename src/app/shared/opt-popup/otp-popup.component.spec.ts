import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OtpPopupComponent } from './otp-popup.component';
import { CoreModule } from 'src/app/core';

describe('OtpPopupComponent', () => {
  let component: OtpPopupComponent;
  let fixture: ComponentFixture<OtpPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [OtpPopupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
