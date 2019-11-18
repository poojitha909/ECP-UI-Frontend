import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAskExpertsComponent } from './featured-ask-experts.component';

describe('FeaturedAskExpertsComponent', () => {
  let component: FeaturedAskExpertsComponent;
  let fixture: ComponentFixture<FeaturedAskExpertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedAskExpertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAskExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
