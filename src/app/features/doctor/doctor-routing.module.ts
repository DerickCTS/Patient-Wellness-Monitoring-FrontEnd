import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProfileComponent } from './components/profile/profile';

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent, 
    children: [
      { path: 'overview', redirectTo: '', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // 🔑 FIX: Export RouterModule so its directives like [routerLink] are available 
  // to components that import DoctorRoutingModule (like DashboardComponent)
  exports: [RouterModule] 
})
export class DoctorRoutingModule { }