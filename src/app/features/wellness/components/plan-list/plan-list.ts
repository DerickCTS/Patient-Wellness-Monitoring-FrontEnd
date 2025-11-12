import { Component, OnInit } from '@angular/core';
import { WellnessService } from '../../services/wellness.service';
import { PlanAssignmentDto } from '../../models/plan.dto';
import { MatDialog } from '@angular/material/dialog';
import { WellnessPlanDetailComponent } from '../../../../shared/components/wellness-plan-detail/wellness-plan-detail';
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
  filteredPlans: PlanAssignmentDto[] = [];
  isLoading = true;

  // Filter values
  statusFilter = 'All';
  categoryFilter = 'All';
  dateFilter: 'today' | 'week' | 'month' = 'week';

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
      .getPlans('All', 'All', this.dateFilter)
      .subscribe((data) => {
        this.plans = data;
        this.applyFilters();
        this.isLoading = false;
      });
  }

  applyFilters(): void {
    this.filteredPlans = this.plans.filter(plan => {
      const matchesStatus = this.statusFilter === 'All' || plan.status === this.statusFilter;
      const matchesCategory = this.categoryFilter === 'All' || plan.category === this.categoryFilter;
      // TODO: Add date filter logic
      return matchesStatus && matchesCategory;
    });
  }

  onFilterChange(filter: 'Status' | 'Category' | 'Date'): void {
    switch(filter) {
      case 'Status':
      case 'Category':
        this.applyFilters();
        break;
      case 'Date':
        this.loadPlans();
        break;
    }
  }

  openDetailsModal(plan: PlanAssignmentDto): void {
    this.dialog.open(WellnessPlanDetailComponent, {
      width: '800px',
      data: { assignmentId: plan.assignmentId },
    });
  }

  openMarkCompleteModal(plan: PlanAssignmentDto): void {
    const dialogRef = this.dialog.open(MarkCompleteModalComponent, {
      width: '400px',
      data: { plan: plan },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPlans();
    });
  }
}
