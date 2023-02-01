import { TestBed } from '@angular/core/testing';

import { PayWindowService } from './pay-window.service';

describe('PayWindowService', () => {
  let service: PayWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
