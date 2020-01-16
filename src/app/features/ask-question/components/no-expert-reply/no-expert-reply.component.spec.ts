import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoExpertReplyComponent } from './no-expert-reply.component';

describe('ExpertNoRecordComponent', () => {
  let component: NoExpertReplyComponent;
  let fixture: ComponentFixture<NoExpertReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoExpertReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoExpertReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
