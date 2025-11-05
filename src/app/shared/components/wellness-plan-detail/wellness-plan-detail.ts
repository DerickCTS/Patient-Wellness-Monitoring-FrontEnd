// src/app/shared/components/wellness-plan-detail/wellness-plan-detail.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlanDetailsDto } from '../../../features/wellness/models/plan.dto';
import { WellnessService } from '../../../features/wellness-assignment/services/wellness-assignment';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-wellness-plan-detail',
  templateUrl: './wellness-plan-detail.html',
  styleUrls: ['./wellness-plan-detail.scss'],

  // --- ADD STANDALONE IMPORTS ---
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
})
export class WellnessPlanDetailComponent {
  // This will hold the data from the API call
  planDetails$!: Observable<PlanDetailsDto>;

  constructor(
    public dialogRef: MatDialogRef<WellnessPlanDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { planId: number },
    public wellnessService: WellnessService // Public for getFullImageUrl
  ) {
    // When the dialog opens, call the API to get the details
    if (data.planId) {
      this.planDetails$ = this.wellnessService.getPlanDetails(data.planId);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}