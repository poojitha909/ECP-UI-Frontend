import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DiscussionsListPageComponent } from './discussions-list-page.component';

describe('DiscussionsListPageComponent', () => {
  let component: DiscussionsListPageComponent;
  let fixture: ComponentFixture<DiscussionsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionsListPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
