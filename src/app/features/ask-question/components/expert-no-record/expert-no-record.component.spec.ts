import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertNoRecordComponent } from './expert-no-record.component';

describe('ExpertNoRecordComponent', () => {
  let component: ExpertNoRecordComponent;
  let fixture: ComponentFixture<ExpertNoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertNoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertNoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
