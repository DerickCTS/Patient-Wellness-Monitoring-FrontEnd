import { TestBed } from '@angular/core/testing';

import { WellnessAssignment } from './wellness-assignment';

describe('WellnessAssignment', () => {
  let service: WellnessAssignment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellnessAssignment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
