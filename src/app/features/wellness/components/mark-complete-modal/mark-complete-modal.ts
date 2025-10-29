import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PlanAssignmentDto, UpdateTaskStatusDto } from '../../models/plan.dto';
import { WellnessService } from '../../services/wellness.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'; // <-- Use ReactiveFormsModule
import { CommonModule } from '@angular/common'; // <-- For *ngIf
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- Fixed import

@Component({
  selector: 'app-mark-complete-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule, // <-- Fixed import
  ],
  templateUrl: './mark-complete-modal.html',
  styleUrls: ['./mark-complete-modal.scss'],
})
export class MarkCompleteModalComponent {
  plan: PlanAssignmentDto;
  isCompleted: boolean;
  isLoading = false;

  // --- THIS IS THE FIX ---
  // 1. Just DECLARE the property here
  notesForm;
  // -----------------------

  constructor(
    public dialogRef: MatDialogRef<MarkCompleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plan: PlanAssignmentDto },
    private wellnessService: WellnessService,
    private fb: FormBuilder // 'fb' becomes available here
  ) {
    this.plan = data.plan;
    // We are doing the OPPOSITE of the current status
    this.isCompleted = this.plan.status !== 'Completed';

    // --- THIS IS THE FIX ---
    // 2. Now INITIALIZE the property inside the constructor
    this.notesForm = this.fb.group({
      patientNotes: [''],
    });
    // -----------------------
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    // 'this.notesForm' will exist now
    const notes = this.notesForm.value.patientNotes || ''; 
    
    const payload: UpdateTaskStatusDto = {
      isComplete: this.isCompleted,
      patientNotes: notes
    };

    this.wellnessService
      .updateTaskStatus(this.plan.taskLogId, payload)
      .subscribe({
        next: () => {
          this.isLoading = false;
          // Send back 'updated' so the list component knows to refresh
          this.dialogRef.close('updated'); 
        },
        error: (err) => {
          console.error('Error updating status', err);
          this.isLoading = false;
          // Optionally show an error message
          this.dialogRef.close(); 
        },
      });
  }

  getButtonText(): string {
    return this.isCompleted ? 'Mark as Complete' : 'Mark as Incomplete';
  }
}