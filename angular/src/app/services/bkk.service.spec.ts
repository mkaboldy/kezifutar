import { TestBed } from '@angular/core/testing';

import { BkkService } from './bkk.service';

describe('BkkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BkkService = TestBed.get(BkkService);
    expect(service).toBeTruthy();
  });
});
