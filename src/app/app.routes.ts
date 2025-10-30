import { Routes } from '@angular/router';
import { ProgressTracking } from './features/wellness/pages/progress-tracking/progress-tracking';
import { PatientDetailsComponent } from './features/wellness_assignment/components/patient-details/patient-details';

export const routes: Routes = [
  {
    path: 'progress',
    // This is the new part: We load the component directly
    loadComponent: () => ProgressTracking,
  },
  {
    path: '',
    redirectTo: '/progress', // Makes your page the default
    pathMatch: 'full',
  },
  {
    path: 'wellness',
    loadComponent: () => PatientDetailsComponent
  },
  {
    path: 'diagnosis',
    loadChildren: () =>
      import('./features/diagnosis/diagnosis-module').then(
        (m) => m.DiagnosisModule
      ),
  }
];