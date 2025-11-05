// src/app/features/wellness/wellness-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientSearchComponent } from './pages/patient-search/patient-search';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard';

const routes: Routes = [
  {
    path: '', // The base 'wellness' route
    component: PatientSearchComponent, // Shows the search page
  },
  {
    path: 'patient/:id', // e.g., 'wellness/patient/5'
    component: PatientDashboardComponent, // Shows the dashboard (Part 2)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellnessRoutingModule {}