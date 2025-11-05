import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard'; 

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
    // canActivate: [authGuard], 
    children: [
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
      // ...add all other private routes here
    ]
  },
];
