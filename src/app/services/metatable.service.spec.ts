import { TestBed } from '@angular/core/testing';

import { MetatableService } from './metatable.service';

describe('MetatableService', () => {
  let service: MetatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
