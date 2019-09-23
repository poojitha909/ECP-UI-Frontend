import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscussionCreatePageComponent } from './discussion-create-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiscussionCreatePageComponent', () => {
  let component: DiscussionCreatePageComponent;
  let fixture: ComponentFixture<DiscussionCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DiscussionCreatePageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
