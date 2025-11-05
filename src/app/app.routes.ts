import { Routes } from '@angular/router';
import { AppointmentPageComponent } from './features/appointments/pages/appointments-page/appointments-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentPageComponent },
  
];
