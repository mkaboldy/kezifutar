import { TestBed } from '@angular/core/testing';

import { BkkService } from './bkk.service';

describe('BkkService', () => {
  let service: BkkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BkkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
