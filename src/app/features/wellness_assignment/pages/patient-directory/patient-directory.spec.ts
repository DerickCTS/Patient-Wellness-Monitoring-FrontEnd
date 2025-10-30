import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDirectory } from './patient-directory';

describe('PatientDirectory', () => {
  let component: PatientDirectory;
  let fixture: ComponentFixture<PatientDirectory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDirectory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDirectory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
