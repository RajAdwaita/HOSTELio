import { TestBed } from '@angular/core/testing';

import { locationService } from './location-detail.service';

describe('locationService', () => {
  let service: locationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(locationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
