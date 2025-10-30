import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PatientBasicDto } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PatientSummaryCardComponent } from '../patient-summary-card/patient-summary-card';

@Component({
  selector: 'app-patient-search-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressBarModule, PatientSummaryCardComponent
  ],
  templateUrl: './patient-search-form.html', // Delegated
  styleUrls: ['./patient-search-form.scss'] // Delegated
})
export class PatientSearchFormComponent {
  searchQuery = '';
  searchType: 'name' | 'id' = 'name';

  @Input({ required: true }) searchResults!: PatientBasicDto[];
  @Input({ required: true }) isLoading!: boolean;
  
  @Output() searchPerformed = new EventEmitter<{ query: string; searchType: 'name' | 'id' }>();
  @Output() patientSelected = new EventEmitter<number>();

  searchPatient(): void {
    if (this.searchQuery) {
      this.searchPerformed.emit({ query: this.searchQuery, searchType: this.searchType });
    }
  }

  selectPatient(patientId: number): void {
    this.patientSelected.emit(patientId);
  }
}