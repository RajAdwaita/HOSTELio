import { TestBed } from '@angular/core/testing';

import { paymentService } from './payment-detail.service';

describe('paymentService', () => {
  let service: paymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(paymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
