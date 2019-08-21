import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscussionDetailPageComponent } from './discussion-detail-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiscussionDetailPageComponent', () => {
  let component: DiscussionDetailPageComponent;
  let fixture: ComponentFixture<DiscussionDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DiscussionDetailPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
