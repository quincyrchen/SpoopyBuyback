import { TestBed } from '@angular/core/testing';

import { TaxExemptionService } from './tax-exemption.service';

describe('TaxExemptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxExemptionService = TestBed.get(TaxExemptionService);
    expect(service).toBeTruthy();
  });
});
