import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTermsComponent } from './user-terms.component';

describe('UserTermsComponent', () => {
  let component: UserTermsComponent;
  let fixture: ComponentFixture<UserTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
