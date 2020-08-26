import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergedAccountModalComponent } from './merged-account-modal.component';

describe('MergedAccountModalComponent', () => {
  let component: MergedAccountModalComponent;
  let fixture: ComponentFixture<MergedAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergedAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergedAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
