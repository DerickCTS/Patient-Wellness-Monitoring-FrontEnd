import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboard } from './appointment-dashboard';

describe('AppointmentDashboard', () => {
  let component: AppointmentDashboard;
  let fixture: ComponentFixture<AppointmentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
