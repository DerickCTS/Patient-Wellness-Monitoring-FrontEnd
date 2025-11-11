// src/app/features/wellness/pages/patient-dashboard/patient-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators'; // Make sure 'tap' is imported
import {
  PatientFullDetailsDto,
  DiagnosisDetailsDto,
  AssignedWellnessPlanDto,
} from '../../models/wellness-assignment.model';
import { WellnessService } from '../../services/wellness-assignment';

// --- Dialog imports from Part 3 ---
import { MatDialog } from '@angular/material/dialog';
import { WellnessPlanDetailComponent } from '../../../../shared/components/wellness-plan-detail/wellness-plan-detail';

// --- Dialog import from Part 4 ---
import { AssignPlanModalComponent } from '../../components/assign-plan-modal/assign-plan-modal';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'; // For Accordion
import { MatTableModule } from '@angular/material/table';     // For Medications
import { MatChipsModule } from '@angular/material/chips';     // For Status tags
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfoItemComponent } from '../../components/info-item/info-item'; // Helper component

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard-updated.html',
  styleUrls: ['./patient-dashboard-updated.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    InfoItemComponent,            // The helper component
    WellnessPlanDetailComponent, // The Part 3 popup
    AssignPlanModalComponent,  // The Part 4 popup
  ],
})
export class PatientDashboardComponent implements OnInit {
  patientId!: number;
  patientDetails$!: Observable<PatientFullDetailsDto>;

  // Track which diagnosis is expanded
  activeDiagnosisId: number | null = null;
  activeDiagnosisDetails$: Observable<DiagnosisDetailsDto | null> = of(null);

  // For the medications table
  medicationColumns: string[] = ['name', 'dosage', 'status'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public wellnessService: WellnessService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.patientDetails$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      map((id) => {
        if (!id) {
          this.goBack();
          throw new Error('Patient ID is missing');
        }
        this.patientId = +id; // Store the ID
        return this.patientId;
      }),
      switchMap((patientId) =>
        this.wellnessService.getPatientFullDetails(patientId)
      )
    );
  }

  // --- Diagnosis History Methods (THESE ARE THE MISSING ONES) ---

  /**
   * Called when the user clicks to expand a diagnosis panel.
   * It fetches the details for that specific diagnosis.
   */
  loadDiagnosisDetails(diagnosisId: number): void {
    if (this.activeDiagnosisId === diagnosisId) {
      // If clicking the same one, collapse it
      this.activeDiagnosisId = null;
      this.activeDiagnosisDetails$ = of(null);
    } else {
      // Expand the clicked one
      this.activeDiagnosisId = diagnosisId;
      this.activeDiagnosisDetails$ = this.wellnessService.getDiagnosisDetails(diagnosisId);
    }
  }

  /**
   * Called when the user closes an expansion panel.
   * This clears the old data to save memory.
   */
  clearDiagnosisDetails(): void {
    this.activeDiagnosisDetails$ = of(null);
  }

  isMedicationActive(endDate: string | Date): boolean {
    const today = new Date();
    const end = new Date(endDate);
    return today <= end;
  }

  // --- Wellness Plan Methods ---

  /**
   * (Part 3) Called when "View Details" is clicked.
   */
  viewPlanDetails(plan: AssignedWellnessPlanDto): void {

    this.dialog.open(WellnessPlanDetailComponent, {
      width: '650px',
      data: { assignmentId: plan.assignmentId },
      autoFocus: false,
    });
  }

  /**
   * (Part 4) Called when "Assign Wellness Plan" is clicked.
   */
  assignNewPlan(patient: PatientFullDetailsDto): void {
    const dialogRef = this.dialog.open(AssignPlanModalComponent, {
      width: '900px',
      maxWidth: '90vw',
      data: {
        patientId: patient.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
      },
      autoFocus: false,
    });

    // After the dialog closes, refresh the data
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.patientDetails$ = this.wellnessService
          .getPatientFullDetails(this.patientId)
          .pipe(
            tap(() => this.wellnessService.showSuccess('Plan list refreshed!'))
          );
      }
    });
  }

  // --- Navigation ---

  goBack(): void {
    this.router.navigate(['/wellness']); // Go back to search
  }
}