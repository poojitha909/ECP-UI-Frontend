import { TestBed } from '@angular/core/testing';

import { EpcServiceService } from './epc-service.service';

describe('EpcServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EpcServiceService = TestBed.get(EpcServiceService);
    expect(service).toBeTruthy();
  });
});
