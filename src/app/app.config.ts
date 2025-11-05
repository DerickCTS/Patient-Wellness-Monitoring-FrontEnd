import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// FIX: This resolves TS2305 by ensuring 'routes' is imported from the correct file,
// which is fixed below.
import { routes } from './app.routes'; 
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // Assuming you might use HTTP later
  ]
};