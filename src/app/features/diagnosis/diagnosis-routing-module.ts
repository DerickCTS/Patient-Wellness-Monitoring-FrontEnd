// src/app/features/diagnosis/diagnosis-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list';
import { AppointmentDiagnosisComponent } from './pages/appointment-diagnosis/appointment-diagnosis';

const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent,
  },
  {
    path: ':id',
    component: AppointmentDiagnosisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosisRoutingModule {}