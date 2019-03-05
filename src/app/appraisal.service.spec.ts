import { TestBed } from '@angular/core/testing';

import { AppraisalService } from './appraisal.service';

describe('AppraisalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalService = TestBed.get(AppraisalService);
    expect(service).toBeTruthy();
  });
});
