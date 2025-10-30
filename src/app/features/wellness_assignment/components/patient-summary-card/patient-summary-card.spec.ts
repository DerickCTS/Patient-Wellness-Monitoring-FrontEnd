import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSummaryCardComponent } from '../../components/patient-summary-card/patient-summary-card';

describe('PatientSummaryCard', () => {
  let component: PatientSummaryCardComponent;
  let fixture: ComponentFixture<PatientSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
