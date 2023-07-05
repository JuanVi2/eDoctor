import { TestBed } from '@angular/core/testing';

import { GlucosaService } from './glucosa.service';

describe('GlucosaService', () => {
  let service: GlucosaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlucosaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
