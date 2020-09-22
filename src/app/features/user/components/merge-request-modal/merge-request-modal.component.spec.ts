import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeRequestModalComponent } from './merge-request-modal.component';

describe('MergeRequestModalComponent', () => {
  let component: MergeRequestModalComponent;
  let fixture: ComponentFixture<MergeRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
