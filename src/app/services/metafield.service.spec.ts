import { TestBed } from '@angular/core/testing';

import { MetafieldService } from './metafield.service';

describe('MetafieldService', () => {
  let service: MetafieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetafieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
