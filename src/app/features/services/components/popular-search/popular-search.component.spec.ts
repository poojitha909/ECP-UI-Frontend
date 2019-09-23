import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSearchComponent } from './popular-search.component';
import { CoreModule } from 'src/app/core';

describe('PopularSearchComponent', () => {
  let component: PopularSearchComponent;
  let fixture: ComponentFixture<PopularSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [PopularSearchComponent]
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
