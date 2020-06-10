import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcomeViewComponent } from './user-welcome-view.component';

describe('UserWelcomeViewComponent', () => {
  let component: UserWelcomeViewComponent;
  let fixture: ComponentFixture<UserWelcomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWelcomeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWelcomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
