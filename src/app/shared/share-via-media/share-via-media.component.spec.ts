import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareViaMediaComponent } from './share-via-media.component';

describe('ShareViaMediaComponent', () => {
  let component: ShareViaMediaComponent;
  let fixture: ComponentFixture<ShareViaMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareViaMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareViaMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
