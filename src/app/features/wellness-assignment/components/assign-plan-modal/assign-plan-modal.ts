// src/app/features/wellness/components/assign-plan-modal/assign-plan-modal.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../shared/services/auth';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormCreateScratchComponent } from '../form-create-scratch/form-create-scratch';
import { FormUseTemplateComponent } from '../form-use-template/form-use-template';

@Component({
  selector: 'app-assign-plan-modal',
  templateUrl: './assign-plan-modal.html',
  styleUrls: ['./assign-plan-modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormCreateScratchComponent,
    FormUseTemplateComponent,
  ],
})
export class AssignPlanModalComponent {
  activeView: 'template' | 'scratch' = 'template';

  patientId: string;
  patientName: string;
  doctorId: string;

  constructor(
    public dialogRef: MatDialogRef<AssignPlanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number; patientName: string },
    private authService: AuthService
  ) {
    this.patientId = data.patientId.toString();
    this.patientName = data.patientName;

    // This is the CRITICAL step from Blocker 1
    // const id = this.authService.getDoctorId();
    const id = '1';
    if (!id) {
      console.error('Doctor ID not found! Cannot assign plan.');
      this.dialogRef.close();
    }
    this.doctorId = id!;
  }

  // This is called by the (planAssigned) event from either form
  onPlanAssigned(): void {
    this.dialogRef.close(true); // Close the dialog and signal success
  }
}
