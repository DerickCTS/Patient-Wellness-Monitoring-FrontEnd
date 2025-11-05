import { Routes } from '@angular/router';
import { ProgressTracking } from './features/wellness/pages/progress-tracking/progress-tracking';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth', // Makes your page the default
    pathMatch: 'full',
  },
  {
    path: 'auth', 
    loadComponent: () =>
      import('./features/auth/pages/auth-page/auth-page').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    path: 'progress',
    loadComponent: () => 
      import('./features/wellness/pages/progress-tracking/progress-tracking').then(
        (m) => m.ProgressTracking
      ),
  },
  {
    path: 'diagnosis',
    loadChildren: () =>
      import('./features/diagnosis/diagnosis-module').then(
        (m) => m.DiagnosisModule
      ),
  },
  {
    path: 'wellness',
    loadChildren: () =>
      import('./features/wellness-assignment/wellness-assignment-module').then(
        (m) => m.WellnessModule
      ),
  },
];