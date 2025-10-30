// src/app/features/diagnosis/diagnosis-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list';
import { AppointmentDiagnosisComponent } from './pages/appointment-diagnosis/appointment-diagnosis';

const routes: Routes = [
  {
    path: '', // This will be '.../diagnosis'
    component: AppointmentListComponent,
  },
  {
    path: ':id', // This will be '.../diagnosis/1'
    component: AppointmentDiagnosisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosisRoutingModule {}