import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanAssignmentDto } from '../../models/plan.dto';
import { CommonModule } from '@angular/common'; // <-- For ngClass
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule
  ],
  templateUrl: './plan-card.html',
  styleUrls: ['./plan-card.scss'],
})
export class PlanCardComponent {
  @Input() plan!: PlanAssignmentDto;
  @Output() onViewDetails = new EventEmitter<PlanAssignmentDto>();
  @Output() onMarkComplete = new EventEmitter<PlanAssignmentDto>();

  viewDetails() {
    this.onViewDetails.emit(this.plan);
  }

  markComplete() {
    this.onMarkComplete.emit(this.plan);
  }
}
