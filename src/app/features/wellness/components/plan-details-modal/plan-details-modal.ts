import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { WellnessService } from '../../services/wellness.service';
import { PlanDetailsDto } from '../../models/plan.dto';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // <-- For *ngIf, | async
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms'; // <-- For ngModel

@Component({
  selector: 'app-plan-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './plan-details-modal.html',
  styleUrls: ['./plan-details-modal.scss'],
})
export class PlanDetailsModalComponent implements OnInit {
  // Observable to hold the plan details
  planDetails$!: Observable<PlanDetailsDto>;
  activeTab: 'description' | 'instruction' | 'benefits' | 'safety' = 'description';

  constructor(
    public dialogRef: MatDialogRef<PlanDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignmentId: number },
    private wellnessService: WellnessService
  ) { }

  ngOnInit(): void {
    // Fetch details when the modal opens
    this.planDetails$ = this.wellnessService.getPlanDetails(
      this.data.assignmentId
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  // Function to change the active info tab
  selectTab(tab: 'description' | 'instruction' | 'benefits' | 'safety') {
    this.activeTab = tab;
  }
}
