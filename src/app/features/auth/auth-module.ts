// src/app/features/auth/auth.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- We need all these for our forms and UI ---
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // for datepicker
import { MatProgressBarModule } from '@angular/material/progress-bar'; // for loading
import { MatTooltipModule } from '@angular/material/tooltip'; // for icons

import { AuthRoutingModule } from './auth-routing-module';

// --- Import our standalone components ---
import { AuthPageComponent } from './pages/auth-page/auth-page';
import { LoginFormComponent } from './components/login-form/login-form';
import { PatientRegisterFormComponent } from './components/patient-register-form/patient-register-form';
import { DoctorRegisterFormComponent } from './components/doctor-register-form/doctor-register-form';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,

    // --- Import all UI and Form modules ---
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTooltipModule,

    // --- Import all our standalone components ---
    AuthPageComponent,
    LoginFormComponent,
    PatientRegisterFormComponent,
    DoctorRegisterFormComponent,
  ],
})
export class AuthModule {}