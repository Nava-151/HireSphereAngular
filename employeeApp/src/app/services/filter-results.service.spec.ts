import { TestBed } from '@angular/core/testing';

import { FilterResultsService } from './filter-results.service';

describe('FilterResultsService', () => {
  let service: FilterResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
