import { TestBed } from '@angular/core/testing';

//Renamed wellness to WellnessService
import { WellnessService } from './wellness.service';

describe('Wellness', () => {
  let service: WellnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
