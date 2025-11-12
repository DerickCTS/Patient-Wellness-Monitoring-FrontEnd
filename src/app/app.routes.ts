import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; 
import { HomePageComponent } from './home/home';

export const routes: Routes = [

  // Public Routes
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => {
      return import('./home/home').then(
        (m) => m.HomePageComponent
      )
    }
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/pages/auth-page/auth-page').then(
        (m) => m.AuthPageComponent
      ),
  },

  // Private Routes defined after the user has logged in.
  {
    path: '',
    loadComponent: () => {
      return import('./core/layouts/private-layout/private-layout').then(
        (m) => m.PrivateLayoutComponent
      )
    },
    canActivate: [authGuard],
    children: [
      {
        path: 'progress',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/wellness/pages/progress-tracking/progress-tracking').then(
            (m) => m.ProgressTracking
          ),
      },
      {
        path: 'diagnosis',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/diagnosis/diagnosis-module').then(
            (m) => m.DiagnosisModule
          ),
      },
      {
        path: 'patient-dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/patient-dashboard/pages/patient-dashboard/patient-dashboard.page').then(
            (m) => m.PatientDashboardPage
          ),
      },
      {
        path: 'wellness',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/wellness-assignment/wellness-assignment-module').then(
            (m) => m.WellnessModule
          ),
      },
      {
        path: 'my-appointments',
        canActivate: [authGuard],
        loadChildren: () => 
          import('./features/appointment-patient/appointment-patient-module').then(
            (m) => m.AppointmentPatientModule
          ),
      },
      {
        path: 'doctor-dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/doctor/doctor.module').then(
            (m) => m.DoctorModule
          ),
      }
    ]
  },
];
