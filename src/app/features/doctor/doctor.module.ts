import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // 🔑 FIX: Required for *ngIf, *ngFor, [ngClass], | number pipe
import { HttpClientModule } from '@angular/common/http';
import { DoctorRoutingModule } from './doctor-routing.module';

// Imports for all components, modals, and panels
import { DoctorService } from './services/doctor.service';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProfileComponent } from './components/profile/profile';
import { PatientBreakdownComponent } from './components/patient-breakdown/patient-breakdown';
import { AppointmentsBreakdownComponent } from './components/appointments-breakdown/appointments-breakdown';
import { ActivePrescriptionsComponent } from './components/active-prescriptions/active-prescriptions';
import { WellnessPlansBreakdownComponent } from './components/wellness-plans-breakdown/wellness-plans-breakdown';
// import { AppointmentDetailsComponent } from './panels/appointment-details/appointment-details';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    DoctorRoutingModule,
    DashboardComponent,
    ProfileComponent,
    PatientBreakdownComponent,
    AppointmentsBreakdownComponent,
    ActivePrescriptionsComponent,
    WellnessPlansBreakdownComponent
  ],
  providers: [
    DoctorService
  ],
  exports: [
    DashboardComponent
  ]
})
export class DoctorModule { }