import { TestBed } from '@angular/core/testing';

import { HaulingExemptionService } from './hauling-exemption.service';

describe('HaulingExemptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HaulingExemptionService = TestBed.get(HaulingExemptionService);
    expect(service).toBeTruthy();
  });
});
