import { TestBed } from '@angular/core/testing';

import { DetailResolverService } from './detail-resolver.service';

describe('DetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailResolverService = TestBed.get(DetailResolverService);
    expect(service).toBeTruthy();
  });
});
