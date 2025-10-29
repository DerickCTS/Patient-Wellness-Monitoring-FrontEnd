// src/app/features/diagnosis/diagnosis.module.ts
// --- THIS IS THE FIXED CODE ---

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Import ReactiveFormsModule for our forms ---
import { ReactiveFormsModule } from '@angular/forms';

// --- Import all the Angular Material modules we need ---
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { DiagnosisRoutingModule } from './diagnosis-routing-module';

// --- Import the Standalone Components ---
import { AppointmentListComponent } from './pages/appointment-list/appointment-list';
import { AppointmentDiagnosisComponent } from './pages/appointment-diagnosis/appointment-diagnosis';
import { DiagnosisFormComponent } from './components/diagnosis-form/diagnosis-form';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form';

@NgModule({
  // --- NO DECLARATIONS ARRAY ---
  imports: [
    CommonModule,
    DiagnosisRoutingModule,

    // --- Add ALL the modules here ---
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDividerModule,
    MatChipsModule,

    // --- Add ALL the standalone components here ---
    AppointmentListComponent,
    AppointmentDiagnosisComponent,
    DiagnosisFormComponent,
    PrescriptionFormComponent,
  ],
})
export class DiagnosisModule {}