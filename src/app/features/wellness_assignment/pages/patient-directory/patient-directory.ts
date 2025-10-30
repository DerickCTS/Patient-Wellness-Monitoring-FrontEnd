import { Component, signal } from '@angular/core';
import { PatientBasicDto, PatientFullDto } from '../../models/patient.model';
import { PatientSearchFormComponent } from '../../components/patient-search-form/patient-search-form';
import { PatientSummaryCardComponent } from '../../components/patient-summary-card/patient-summary-card';
import { PatientDetailsComponent } from '../../components/patient-details/patient-details';
import { WellnessService } from '../../services/wellness';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-directory-page',
  standalone: true,
  imports: [
    CommonModule,
    PatientSearchFormComponent,
    PatientSummaryCardComponent,
    PatientDetailsComponent,
    MatIconModule,
  ],
  template: `
    <div class="patient-directory-container">
      <h2 *ngIf="!selectedPatientId()">Patient Directory</h2>

      <ng-container *ngIf="!selectedPatientId()">
        <app-patient-search-form 
          (searchPerformed)="handleSearch($event)" 
          [searchResults]="searchResults()"
          [isLoading]="isLoadingSearch()"
          (patientSelected)="selectPatient($event)">
        </app-patient-search-form>
      </ng-container>

      <ng-container *ngIf="selectedPatientId()">
        <button (click)="goBackToSearch()" class="back-button">
          <mat-icon>arrow_back</mat-icon> Go Back
        </button>
        <app-patient-details 
          [patientId]="selectedPatientId()!" 
          [patientDetails]="patientDetails()"
          [isLoading]="isLoadingDetails()"
          (planAssigned)="handlePlanAssigned()">
        </app-patient-details>
      </ng-container>
    </div>
  `,
  styles: [`
    .patient-directory-container { padding: 24px; }
    .back-button { 
      background: none; 
      border: none; 
      color: var(--primary-color, #4A148C); /* Use a color from your theme */
      cursor: pointer; 
      display: flex; 
      align-items: center;
      margin-bottom: 16px;
      font-weight: 500;
    }
    .back-button mat-icon { margin-right: 8px; font-size: 18px; }
  `],
  providers: [WellnessService]
})
export class PatientDirectoryPage {
  searchResults = signal<PatientBasicDto[]>([]);
  selectedPatientId = signal<number | null>(null);
  patientDetails = signal<PatientFullDto | null>(null);
  isLoadingSearch = signal(false);
  isLoadingDetails = signal(false);

  constructor(private wellnessService: WellnessService) {}

  goBackToSearch(): void {
    this.selectedPatientId.set(null);
    this.patientDetails.set(null);
  }

  handleSearch({ query, searchType }: { query: string; searchType: 'name' | 'id' }): void {
    this.isLoadingSearch.set(true);
    this.searchResults.set([]);
    this.wellnessService.searchPatients(query, searchType).subscribe({
      next: (data) => this.searchResults.set(data),
      error: (err) => { console.error('Search failed', err); this.searchResults.set([]); },
      complete: () => this.isLoadingSearch.set(false)
    });
  }

  selectPatient(patientId: number): void {
    this.selectedPatientId.set(patientId);
    this.loadPatientDetails(patientId);
  }

  loadPatientDetails(patientId: number): void {
    this.isLoadingDetails.set(true);
    this.wellnessService.getPatientDetails(patientId).subscribe({
      next: (data) => this.patientDetails.set(data),
      error: (err) => { console.error('Details failed', err); this.patientDetails.set(null); },
      complete: () => this.isLoadingDetails.set(false)
    });
  }
  
  // Logic to refresh data after a plan is assigned (optional, but good practice)
  handlePlanAssigned(): void {
     if (this.selectedPatientId()) {
        this.loadPatientDetails(this.selectedPatientId()!);
     }
  }
}