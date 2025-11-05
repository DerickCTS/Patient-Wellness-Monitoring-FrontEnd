import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessPlanDetail } from './wellness-plan-detail';

describe('WellnessPlanDetail', () => {
  let component: WellnessPlanDetail;
  let fixture: ComponentFixture<WellnessPlanDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellnessPlanDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellnessPlanDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
