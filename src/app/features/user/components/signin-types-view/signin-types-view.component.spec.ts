import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninTypesViewComponent } from './signin-types-view.component';
import { CoreModule } from 'src/app/core';

describe('SigninTypesViewComponent', () => {
  let component: SigninTypesViewComponent;
  let fixture: ComponentFixture<SigninTypesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [SigninTypesViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninTypesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
