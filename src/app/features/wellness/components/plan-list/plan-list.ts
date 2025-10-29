import { Component, OnInit } from '@angular/core';
import { WellnessService } from '../../services/wellness.service';
import { PlanAssignmentDto } from '../../models/plan.dto';
import { MatDialog } from '@angular/material/dialog';
import { PlanDetailsModalComponent } from '../plan-details-modal/plan-details-modal';
import { MarkCompleteModalComponent } from '../mark-complete-modal/mark-complete-modal';
import { CommonModule } from '@angular/common'; // <-- For *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // <-- For ngModel
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlanCardComponent } from '../plan-card/plan-card';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    PlanCardComponent,
  ],
  templateUrl: './plan-list.html',
  styleUrls: ['./plan-list.scss'],
})
export class PlanListComponent implements OnInit {
  plans: PlanAssignmentDto[] = [];
  isLoading = true;

  // Filter values
  statusFilter = 'All';
  categoryFilter = 'All';
  dateFilter = 'This Week';

  // Your filter options
  categories = ['All', 'Physical', 'Exercise', 'Diet', 'Mental Wellness', 'Sleep', 'Medical'];

  constructor(
    private wellnessService: WellnessService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.isLoading = true;
    this.wellnessService
      .getPlans(this.statusFilter, this.categoryFilter, this.dateFilter)
      .subscribe((data) => {
        this.plans = data;
        this.isLoading = false;
      });
  }

  onFilterChange(): void {
    this.loadPlans();
  }

  openDetailsModal(plan: PlanAssignmentDto): void {
    // Note: The component class name is still 'PlanDetailsModalComponent'
    this.dialog.open(PlanDetailsModalComponent, {
      width: '800px',
      data: { assignmentId: plan.assignmentId },
    });
  }

  openMarkCompleteModal(plan: PlanAssignmentDto): void {
    // Note: The component class name is still 'MarkCompleteModalComponent'
    const dialogRef = this.dialog.open(MarkCompleteModalComponent, {
      width: '400px',
      data: { plan: plan },
    });

    // After the modal closes, check if we need to refresh the list
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.loadPlans(); // Reload the plans to show new status
      }
    });
  }
}
