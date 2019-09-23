import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ExpertDetailCardComponent } from './expert-detail-card.component';
import { CoreModule } from 'src/app/core';

describe('ExpertDetailCardComponent', () => {
  let component: ExpertDetailCardComponent;
  let fixture: ComponentFixture<ExpertDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ExpertDetailCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
