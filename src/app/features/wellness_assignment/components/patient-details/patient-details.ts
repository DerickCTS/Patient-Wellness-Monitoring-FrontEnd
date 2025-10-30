import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { PatientFullDto, DiagnosisDto, DiseaseDetailsDto, WellnessPlanSummaryDto, MedicationDto } from '../../models/patient.model';
import { CommonModule, DatePipe } from '@angular/common'; // Added DatePipe for standalone use
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssignPlanModalComponent } from '../assign-plan-modal/assign-plan-modal';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WellnessService } from '../../services/wellness';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressBarModule, MatTabsModule,
    AssignPlanModalComponent, DatePipe
  ],
  templateUrl: './patient-details.html', // Delegated
  styleUrls: ['./patient-details.scss'] // Delegated
})
export class PatientDetailsComponent {
  @Input({ required: true }) patientId!: number;
  @Input({ required: true }) patientDetails!: PatientFullDto | null;
  @Input({ required: true }) isLoading!: boolean;
  @Output() planAssigned = new EventEmitter<void>();

  selectedDiagnosis = signal<DiagnosisDto | null>(null);
  selectedDiagnosisDetails = signal<DiseaseDetailsDto | null>(null);

  constructor(public dialog: MatDialog, private wellnessService: WellnessService) {
    effect(() => {
        if (this.patientId) {
            this.selectedDiagnosis.set(null);
            this.selectedDiagnosisDetails.set(null);
        }
    });
  }

  calculateAge(dob: string): number {
    const birthday = new Date(dob);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  loadDiseaseDetails(diagnosisId: number): void {
    const diagnosis = this.patientDetails?.diagnoses.find(d => d.diagnosisId === diagnosisId);
    if (!diagnosis) return;

    this.selectedDiagnosis.set(diagnosis);
    // NOTE: For this mock, we assume the diagnosisId can be passed. If API 3 truly uses a fixed ID,
    // the call needs adjustment based on actual backend behavior.
    this.wellnessService.getDiseaseDetails(diagnosisId).subscribe({
      next: (details) => this.selectedDiagnosisDetails.set(details),
      error: (err) => { console.error('Failed to load disease details', err); this.selectedDiagnosisDetails.set(null); }
    });
  }

  openAssignPlanModal(): void {
    if (!this.patientDetails) return;
    const patientName = `${this.patientDetails.firstName} ${this.patientDetails.lastName}`;
    const dialogRef = this.dialog.open(AssignPlanModalComponent, {
      width: '800px',
      data: { patientId: this.patientId, patientName: patientName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        alert('Wellness Plan successfully assigned!');
        this.planAssigned.emit();
      } else if (result === false) {
        alert('Failed to assign Wellness Plan.');
      }
    });
  }
  
  // TrackBy functions for list performance
  trackByDiagnosis(index: number, item: DiagnosisDto): number { return item.diagnosisId; }
  trackByMedication(index: number, item: MedicationDto): string { return item.medicationName + index; }
  trackByPlan(index: number, item: WellnessPlanSummaryDto): string { return item.planName + index; }
}