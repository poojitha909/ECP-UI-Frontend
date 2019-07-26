import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PopularSearchComponent } from './popular-search.component';

describe('PopularSearchComponent', () => {
  let component: PopularSearchComponent;
  let fixture: ComponentFixture<PopularSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ PopularSearchComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
