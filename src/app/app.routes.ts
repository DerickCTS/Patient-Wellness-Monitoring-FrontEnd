import { Routes } from '@angular/router';
import { ProgressTracking } from './features/wellness/pages/progress-tracking/progress-tracking';

export const routes: Routes = [
  {
    path: 'auth', // URL will be /auth
    loadComponent: () =>
      import('./features/auth/pages/auth-page/auth-page').then(
        (m) => m.AuthPageComponent
      ),
    // loadChildren: () =>
    //   import('./features/auth/auth-module').then(
    //     (m) => m.AuthModule
    //   ),
  },
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