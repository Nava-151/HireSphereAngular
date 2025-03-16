import { TestBed } from '@angular/core/testing';

import { ResumeDetailsService } from './resume-details.service';

describe('ResumeDetailsService', () => {
  let service: ResumeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
