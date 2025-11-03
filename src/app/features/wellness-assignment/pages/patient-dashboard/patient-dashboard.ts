// src/app/features/wellness/pages/patient-dashboard/patient-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  PatientFullDetailsDto,
  DiagnosisDetailsDto,
  AssignedWellnessPlanDto,
} from '../../models/wellness.models';
import { WellnessService } from '../../services/wellness.service';

import { MatDialog } from '@angular/material/dialog';
import { WellnessPlanDetailComponent } from 'src/app/shared/components/wellness-plan-detail/wellness-plan-detail.component';
// --- ADD THIS IMPORT ---
import { AssignPlanModalComponent } from '../../components/assign-plan-modal/assign-plan-modal.component';

// --- (Standalone imports...)
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfoItemComponent } from '../../components/info-item/info-item.component';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
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
    InfoItemComponent,
    WellnessPlanDetailComponent,
    AssignPlanModalComponent, // <-- ADD THIS IMPORT
  ],
})
export class PatientDashboardComponent implements OnInit {
  patientId!: number; // Store the patientId
  patientDetails$!: Observable<PatientFullDetailsDto>;
  activeDiagnosisDetails$: Observable<DiagnosisDetailsDto | null> = of(null);
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

  // ... (load/clearDiagnosisDetails methods are unchanged)
  // ... (viewPlanDetails method is unchanged)

  /**
   * (Part 4) Called when "Assign Wellness Plan" is clicked.
   * This is the UPDATED method.
   */
  assignNewPlan(patient: PatientFullDetailsDto): void {
    const dialogRef = this.dialog.open(AssignPlanModalComponent, {
      width: '900px', // A wider dialog
      maxWidth: '90vw',
      data: {
        patientId: patient.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
      },
      autoFocus: false,
    });

    // After the dialog closes, refresh the data
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // 'true' means a plan was successfully assigned
        // This re-runs the API call to get the updated list of plans
        this.patientDetails$ = this.wellnessService
          .getPatientFullDetails(this.patientId)
          .pipe(tap(() => this.wellnessService.showSuccess('Plan list refreshed!')));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/wellness']);
  }
}