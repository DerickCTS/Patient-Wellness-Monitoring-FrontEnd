import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDiagnosisComponent } from './appointment-diagnosis';

describe('AppointmentDiagnosis', () => {
  let component: AppointmentDiagnosisComponent;
  let fixture: ComponentFixture<AppointmentDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDiagnosisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
