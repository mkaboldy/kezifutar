import { TestBed } from '@angular/core/testing';

import { AppstateService } from './appstate.service';

describe('AppstateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppstateService = TestBed.get(AppstateService);
    expect(service).toBeTruthy();
  });
});
