import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDiscussionsComponent } from './featured-discussions.component';

describe('FeaturedDiscussionsComponent', () => {
  let component: FeaturedDiscussionsComponent;
  let fixture: ComponentFixture<FeaturedDiscussionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedDiscussionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
