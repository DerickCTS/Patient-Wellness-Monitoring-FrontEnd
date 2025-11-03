// src/app/features/wellness/wellness.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellnessRoutingModule } from './wellness-routing.module.ts';

// --- SHARED MODULES ---
import { ReactiveFormsModule } from '@angular/forms';

// --- MATERIAL MODULES ---
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'; // For Accordion
import { MatTableModule } from '@angular/material/table';     // For Medications
import { MatChipsModule } from '@angular/material/chips';     // For Status tags
import { MatDialogModule } from '@angular/material/dialog';   // For Popups (Part 3 & 4)
import { MatSelectModule } from '@angular/material/select';   // For Forms (Part 4)
import { MatDatepickerModule } from '@angular/material/datepicker'; // For Forms (Part 4)
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // For Forms (Part 4)
import { MatTooltipModule } from '@angular/material/tooltip'; // For 'View Details'

// --- STANDALONE COMPONENTS ---
// We import them here so they can be routed to
import { PatientSearchComponent } from './pages/patient-search/patient-search.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    WellnessRoutingModule,

    // Add all standalone components
    PatientSearchComponent,
    PatientDashboardComponent,

    // Add all shared/material modules
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
})
export class WellnessModule {}