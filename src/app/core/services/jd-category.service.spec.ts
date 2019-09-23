import { TestBed } from '@angular/core/testing';

import { JdCategoryService } from './jd-category.service';

describe('JdCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JdCategoryService = TestBed.get(JdCategoryService);
    expect(service).toBeTruthy();
  });
});
