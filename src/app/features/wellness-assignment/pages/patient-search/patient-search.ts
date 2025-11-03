// src/app/features/wellness/pages/patient-search/patient-search.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators }_from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientSearchResultDto } from '../../models/wellness.models';
import { WellnessService } from '../../services/wellness.service';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss'],

  // --- ADD ALL IMPORTS FOR STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
})
export class PatientSearchComponent {
  searchType: 'patientName' | 'patientId' = 'patientName';
  searchForm: FormGroup;
  
  // This will hold our results
  results$!: Observable<PatientSearchResultDto[] | null>;
  isLoading = false;
  searchAttempted = false; // To show "No results found"

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public wellnessService: WellnessService // Public so template can use getFullImageUrl
  ) {
    this.searchForm = this.fb.group({
      query: ['', Validators.required],
    });
  }

  onTabChange(index: number): void {
    this.searchType = index === 0 ? 'patientName' : 'patientId';
    // Clear the form and results when switching tabs
    this.searchForm.reset();
    this.results$ = of(null);
    this.searchAttempted = false;
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.searchAttempted = true;
    const query = this.searchForm.get('query')?.value;

    this.results$ = this.wellnessService.searchPatients(this.searchType, query).pipe(
      catchError(() => {
        // On error, just return an empty array
        return of([]); 
      })
    );
    
    // We don't set isLoading = false here, we let the 'async' pipe handle it
    // But for this simple case, we'll just set it.
    this.results$.subscribe(() => this.isLoading = false);
  }

  // Navigate to Part 2
  selectPatient(patientId: number): void {
    this.router.navigate(['/wellness/patient', patientId]);
  }
}