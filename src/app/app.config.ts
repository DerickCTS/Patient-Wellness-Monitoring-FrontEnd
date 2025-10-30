import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // <-- Import this
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- Import this
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),      // <-- Add this for API calls
    provideAnimations(),       // <-- Add this for Angular Material animations
    importProvidersFrom(MatSnackBarModule),
  ]
};
