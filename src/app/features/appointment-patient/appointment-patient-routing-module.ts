// src/app/feature/appointment-patient/appointment-patient-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDashboardComponent } from './pages/appointment-dashboard/appointment-dashboard';

const routes: Routes = [
  {
    path: '', // This will be the '/my-appointments' route
    component: AppointmentDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentPatientRoutingModule {}