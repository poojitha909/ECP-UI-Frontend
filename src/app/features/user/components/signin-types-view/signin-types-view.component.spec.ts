import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninTypesViewComponent } from './signin-types-view.component';

describe('SigninTypesViewComponent', () => {
  let component: SigninTypesViewComponent;
  let fixture: ComponentFixture<SigninTypesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninTypesViewComponent ]
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
