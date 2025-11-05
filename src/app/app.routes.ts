import { Routes } from '@angular/router';
//import { ProgressTracking } from './features/wellness/pages/progress-tracking/progress-tracking';
import { AppointmentsPageComponent } from './features/appointments/pages/appointments-page/appointments-page.component';

export const routes: Routes = [
  /*{
    path: 'progress',
    // This is the new part: We load the component directly
    loadComponent: () => ProgressTracking,
    title: 'Progress Tracking'
  },*/
  {
    path: 'appointments',
    component: AppointmentsPageComponent,
    title: 'Appointments - Patient Wellness Monitoring'
  },
  // --- OTHER FUTURE ROUTES (Add these placeholders back) ---
  // {
  //   path: 'notifications',
  //   // Placeholder for the Notifications feature we will build next
  //   loadComponent: () => import('./features/notifications/pages/notifications-page/notifications-page').then(m => m.NotificationsPageComponent),
  //   title: 'Notifications'
  // },
  // {
  //   path: 'dashboard',
  //   // Placeholder for the Dashboard feature
  //   loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
  //   title: 'Dashboard'
  // },
  {
    path: '',
    redirectTo: '/appointments', // Makes your page the default
    pathMatch: 'full',
  },

  // Wildcard route (Optional, redirects back to default if path is unknown)
  {
    path: '**',
    redirectTo: '/appointments'
  }
];