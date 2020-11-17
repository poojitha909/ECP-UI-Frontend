import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsForYouComponent } from './jobs-for-you.component';

describe('JobsForYouComponent', () => {
  let component: JobsForYouComponent;
  let fixture: ComponentFixture<JobsForYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsForYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
