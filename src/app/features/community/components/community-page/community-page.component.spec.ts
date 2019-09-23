import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommunityPageComponent } from './community-page.component';
import { CoreModule } from 'src/app/core';

describe('CommunityPageComponent', () => {
  let component: CommunityPageComponent;
  let fixture: ComponentFixture<CommunityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      declarations: [CommunityPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
