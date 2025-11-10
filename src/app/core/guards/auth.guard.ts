import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/home']);
    return false;
  }

  const userRole = authService.getRole();
  const path = route.routeConfig?.path || '';

  // Role-based access control
  const patientRoutes = ['progress', 'my-appointments'];
  const doctorRoutes = ['doctor-dashboard', 'wellness', 'diagnosis'];

  if (userRole === 'Patient' && doctorRoutes.includes(path)) {
    router.navigate(['/home']);
    return false;
  }

  if (userRole === 'Doctor' && patientRoutes.includes(path)) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
