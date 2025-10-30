import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegisterForm } from './patient-register-form';

describe('PatientRegisterForm', () => {
  let component: PatientRegisterForm;
  let fixture: ComponentFixture<PatientRegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRegisterForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegisterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
