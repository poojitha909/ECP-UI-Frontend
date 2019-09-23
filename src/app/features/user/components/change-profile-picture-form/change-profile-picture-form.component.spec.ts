import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfilePictureFormComponent } from './change-profile-picture-form.component';

describe('ChangeProfilePictureFormComponent', () => {
  let component: ChangeProfilePictureFormComponent;
  let fixture: ComponentFixture<ChangeProfilePictureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeProfilePictureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfilePictureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
