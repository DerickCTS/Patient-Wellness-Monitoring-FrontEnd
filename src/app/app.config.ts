import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔒 Request URL:', req.url);
  console.log('🍪 withCredentials:', true);
  console.log('📋 All Cookies:', document.cookie);
  const clonedReq = req.clone({ withCredentials: true });
  return next(clonedReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor])),
    importProvidersFrom(MatSnackBarModule),
  ]
};
